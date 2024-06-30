<script setup lang="ts">
import type { UseMediaControlsReturn } from '@vueuse/core'

import { VButton } from '@/components/ui'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    context: UseMediaControlsReturn
    seekParams?: number[]
  }>(),
  {
    seekParams: () => [3, 10, 30]
  }
)

const { playing, volume } = props.context

function togglePlayback() {
  const { playing } = props.context
  playing.value = !playing.value
}

function clamp(value: number, min: number, max: number) {
  /**
   * TODO: implement
   */
  return value
}

function seek(targetTime: number) {
  const { currentTime, duration } = props.context

  currentTime.value = clamp(targetTime, 0, duration.value)
}

function seekRelative(offset: number) {
  const { currentTime } = props.context
  seek(currentTime.value + offset)
}

const iconProps = {
  size: 48,
  strokeWidth: 0,
  strokeLinejoin: 'round',
  strokeLinecap: 'round',
  fill: 'currentColor'
}

const volumeIcon = computed(() => {
  if (volume.value >= 0.5) return 'volume-2'
  if (volume.value >= 0.1) return 'volume-1'
  if (volume.value == 0) return 'volume-x'

  return 'volume'
})
</script>
<template>
  <nav class="player-controls">
    <div class="flex gap-2 flex-row-reverse">
      <VButton
        v-for="param in seekParams"
        :key="param"
        class="icon-button"
        :value="-param"
        :action="seekRelative"
      >
        <VueFeather :type="param >= 10 ? 'chevrons-left' : 'chevron-left'" v-bind="iconProps" />
        <span class="subtext"> {{ param }}s </span>
      </VButton>
    </div>

    <VButton @click="togglePlayback" class="icon-button p-2">
      <VueFeather type="play" v-bind="iconProps" v-if="playing == false" />
      <VueFeather type="pause" v-bind="iconProps" v-if="playing == true" />

      <!-- <span class="subtext"> {{ playing ? 'PAUSE' : 'PLAY' }} </span> -->
      <!-- {{ context.playing ? 'PAUSE' : 'PLAY' }} -->
    </VButton>

    <div class="flex gap-2 flex-row">
      <VButton
        v-for="param in seekParams"
        :key="param"
        class="icon-button"
        :value="param"
        :action="seekRelative"
      >
        <VueFeather :type="param >= 10 ? 'chevrons-right' : 'chevron-right'" v-bind="iconProps" />
        <span class="subtext"> {{ param }}s </span>
      </VButton>
    </div>

    <div class="flex items-center gap-2">
      <VueFeather size="32" :type="volumeIcon" strokeWidth="1" />

      <span class="flex flex-col relative">
        <input type="range" v-model="volume" min="0" max="1" step="0.05" class="volume-slider" />
        <span
          class="font-mono text-center text-xs font-light absolute"
          style="top: 100%; left: 12px"
        >
          {{ (volume * 100).toFixed(0) }}%
        </span>
      </span>
    </div>
  </nav>
</template>
<style lang="scss">
.icon-button {
  //   @apply rounded-full;
  @apply transition-all;

  color: white;
  background: none;
  --ring: 0;

  &:hover {
    --bg-alpha: 20%;
    color: rgba(var(--rgb));
    // color: rgba(255 255 255 / 100%);
  }

  &:active {
    // @apply scale-75;
  }
}

.player-controls {
  @apply flex justify-center items-center;
  //   @apply py-4;
  @apply px-16 py-2;
  @apply gap-4;
  @apply bg-zinc-900 bg-opacity-100;

  @apply backdrop-filter backdrop-blur;
}

.volume-slider {
  width: 160px;

  --size: 12px;
  --width: 8px;

  height: var(--size);

  -webkit-appearance: none; /* Remove default styles for WebKit browsers */
  -moz-appearance: none; /* Remove default styles for Firefox */
  appearance: none; /* Remove default styles in general */

  cursor: cursor;
  outline: none; /* Remove focus outline */

  background-color: rgba(var(--rgb) / 25%);

  //   background: none;

  //   &:active {
  // border-block: 1px solid white;
  //   }

  &::-webkit-slider-runnable-track {
    // background-color: rgba(var(--rgb) / 25%);
    // height: 0px;
    // padding: 4px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Remove default thumb appearance */
    appearance: none;
    height: var(--size);
    width: var(--width, var(--size));
    // margin-top: -6px;
    background-color: rgba(var(--rgb) / 100%);
  }
}

.icon-button {
  @apply p-0;
  @apply items-center justify-center;
  //   @apply bg-blue-500;
  @apply rounded-full;
}

.subtext {
  @apply absolute;
  @apply font-mono;
  @apply rounded-full;
  bottom: -2px;
  font-weight: 500;
  line-height: 12px;
  font-size: 12px;
}
</style>
