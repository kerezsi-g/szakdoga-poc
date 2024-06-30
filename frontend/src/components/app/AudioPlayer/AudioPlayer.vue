<script setup lang="ts">
import { breakpointsVuetifyV2, useMediaControls } from '@vueuse/core'
import { computed, ref } from 'vue'

import { fetchPeaks } from './composables/fetchPeaks'
import ChannelWaveform from './components/channel-waveform.vue'

import { debounce, formatTimestamp } from '@/utils'
import { AsyncLoader } from '@/components/utility'
import { PendingOverlay, VButton } from '@/components/ui'
import PlayerControls from './components/player-controls.vue'
import AudioMetadata from './components/audio-metadata.vue'
import type { TrackAnnotations } from '@/components/data/TrackData/TrackData.vue'

const props = defineProps<{
  fileId: string
  annotations: TrackAnnotations
}>()
const audioElement = ref<HTMLAudioElement>()

const mediaControls = useMediaControls(audioElement, {
  src: `/api/v1/media/${props.fileId}/audio`
})

const waveformContainerRef = ref<HTMLElement>()

const { currentTime, duration /* playing */ } = mediaControls

const playheadPercentage = computed(() => {
  return currentTime.value / duration.value
})

interface Args {
  fileId: string
}

async function getPeaks(args: Args) {
  const result = await fetchPeaks(args.fileId)
  return result
}

const seeking = ref(false)

function mapEventToPercentage(e: MouseEvent) {
  const { offsetX } = e
  const element = waveformContainerRef.value

  //   console.log(clickedElement)

  if (element instanceof HTMLElement) {
    return offsetX / element.offsetWidth
  } else {
    return null
  }
}

function seekToPercentage(pct: number) {
  const { currentTime, duration } = mediaControls
  const seekTo = duration.value * pct

  currentTime.value = seekTo
}

const timestamp = computed(() => {
  return formatTimestamp(currentTime.value)
})

const handleSeek = debounce((e: MouseEvent) => {
  const pct = mapEventToPercentage(e)
  if (pct) seekToPercentage(pct)
}, 10)

function handleSeekStart() {
  const element = waveformContainerRef.value

  if (!element) return

  seeking.value = true

  document.addEventListener('mousemove', handleSeek)

  document.addEventListener('mouseup', (e) => {
    // handleSeek(e)
    seeking.value = false
    document.removeEventListener('mousemove', handleSeek)
  })
}
</script>
<template>
  <main class="audio-container">
    <!-- <header>
        <AudioMetadata />
      </header> -->
    <section
      ref="waveformContainerRef"
      class="waveform-container"
      :class="{ seeking }"
      :style="{ '--ch': 2 }"
    >
      <input
        type="range"
        min="0"
        :max="duration"
        step="0.1"
        class="scrubber"
        v-model="currentTime"
      />
      <AsyncLoader
        :fn="getPeaks"
        :args="{
          fileId
        }"
      >
        <template #data="{ data }">
          <ChannelWaveform
            v-for="ch in data.peaks"
            v-bind="ch"
            :key="ch.channel"
            :length="data.length"
            :bits="data.bits"
          />
        </template>
        <template #pending>
          <PendingOverlay />
        </template>
      </AsyncLoader>

      <!-- <span class="region-label" v-for="marker in annotations.markers" :key="marker.at">
        {{ marker.text }}
      </span> -->

      <!-- <span
        class="region"
        :style="{
          left: (100 / duration) * 100 + '%',
          right: (160 / duration) * 100 + '%'
        }"
      >	  
        <span class="region-label"> region marker </span>
      </span> -->

      <!-- <span
          class="playhead"
          :style="{
            '--tx': playheadPercentage * 100 + '%'
          }"
        >
          <span class="playhead-time">
            {{ timestamp }}
          </span>
          <span class="playhead-button"> </span>
        </span> -->
    </section>
    <!-- <input
      type="range"
      v-model="currentTime"
      min="0"
      :max="duration"
      step="0.1"
      class="scrubber"
      :data-time="timestamp"
    /> -->
    <PlayerControls :context="mediaControls" />
    <audio ref="audioElement" controls hidden class="w-full" />
  </main>
</template>
<style lang="scss">
#audio-viewer {
  @apply bg-black bg-opacity-75;
  display: flex;
  flex-direction: row;
  flex-grow: 1;

  //   align-self: stretch;
}

#annotations-list {
  @apply bg-black bg-opacity-50;
  @apply px-8 py-4;
  letter-spacing: 2px;
  display: flex;
  flex-direction: column;
  width: 512px;
  flex-shrink: 0;

  & > header {
    @apply text-3xl;
    @apply px-4 py-2 gap-2;
    @apply flex items-center;
    font-weight: 300;

    border-bottom: 2px solid;
    border-color: rgba(var(--rgb) / 100%);
  }
}

.timestamp {
  @apply font-mono;
  @apply px-2;
  @apply rounded;
  font-size: 14px;
  font-weight: 400;

  @apply text-sky-500;
  @apply bg-sky-500 bg-opacity-20;

  //   background-color: rgba(var(--rgb) / 20%);
  //   color: rgba(var(--rgb) / 100%);
  //   color: white;
}

.markers-list {
  @apply px-2;
}

.markers-list-item {
  @apply flex flex-row;
  @apply px-6 py-4 gap-2;
  @apply items-center;
  @apply transition-all;
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(255 255 255 / 25%);
  }

  &:hover {
    background-color: rgba(var(--rgb) / 10%);
    color: rgba(var(--rgb) / 100%);
  }
  // }
}

.region {
  @apply px-4;

  > header {
  }
}

.audio-container {
  @apply flex flex-col;
  @apply items-stretch;
  flex-grow: 1;
  user-select: none;
}

.audio-container h1 {
  @apply flex items-center;
  @apply gap-4;
  @apply text-4xl;
  font-weight: 100;
}

.audio-container > header {
  @apply flex;
  @apply items-center;
  @apply px-8 py-4 gap-4;
  @apply text-4xl;
}

.scrubber {
  -webkit-appearance: none; /* Remove default styles for WebKit browsers */
  -moz-appearance: none; /* Remove default styles for Firefox */
  appearance: none; /* Remove default styles in general */

  background-color: transparent;
  cursor: text;
  outline: none; /* Remove focus outline */

  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0;
  right: 0;

  &:active {
    border-block: 1px solid white;
  }

  &::-webkit-slider-runnable-track {
    background-color: transparent;
    height: 100%;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Remove default thumb appearance */
    appearance: none;
    width: 1px; /* Adjust width as needed */
    height: 100%; /* Adjust height as needed */
    background-color: white; /* Thumb color */
    // border-inline: 2px solid rgba(0 255 0 / 100%);
    outline: 3px solid rgba(255 255 255 / 30%);
    // box-shadow: 0px 0px 4px green;
    // cursor: pointer;
  }
}

.waveform-container.seeking .playhead {
  @apply transition-none;
}

.playhead {
  position: absolute;
  width: 1px;
  //   height: 100%;

  overflow: visible;
  left: 0px;
  top: 0px;
  bottom: 0px;
  //   top: 0;
  //   background-color: ;
  //   @apply bg-white;
  background-color: white;
  box-shadow: 0px 0px 0px 3px rgba(255 255 255 / 30%);
  //   @apply ring ring-sky-400 ring-opacity-50;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;

  //   bottom: 0;

  //   background-color: rgba(var(--rgb) / 100%);
  //   border-inline: 1px solid;
  //   border-color: rgba(var(--rgb) / 100%);
  //   border-color: white;

  //   transform: translateX(var(--tx));

  left: var(--tx);

  //   @apply rounded-full;
}

.playhead-time {
  color: white;
  //   background-color: rgba(var(--rgb) / 70%);

  @apply text-xs font-mono;
  @apply rounded-sm;

  font-weight: 200;

  padding: 2px 8px;

  position: absolute;
  background-color: rgba(0 0 0 / 80%);
  bottom: 0;
  //   left: 0;
  //   margin-top: 4px;
  //   transform: translateX(-50%);
}

// .playhead-button {
//   display: block;
//   width: 24px;
//   height: 48px;
//   //   background-color: rgba(var(--rgb) / 100%);
//   background-color: white;
//   border: 1px solid rgba(var(--rgb) / 100%);
//   border-radius: 3px;
//   @apply shadow;

//   cursor: pointer;
// }

.waveform-container .region {
  --rgb: 0 192 0;
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: rgba(var(--rgb) / 25%);
  border-inline: 1px dotted rgba(var(--rgb) / 100%);
}

.region-label {
  @apply text-sm;
  position: absolute;
  //   top: 0;
  bottom: 100%;
  left: 0;
  right: 0;
  background-color: rgba(var(--rgb) / 75%);
  padding-inline: 8px;
  z-index: 150;
}

.waveform-container {
  @apply relative;
  @apply transition-all;

  --ch-height: 128px;
  min-height: var(--ch-height);

  overflow: hidden;
  cursor: text;
  //   border-block: 1px solid rgba(var(--rgb) / 100%);
  //   padding-block: 24px;

  padding-block: 1px;

  gap: 1px;
  display: flex;
  flex-direction: column;

  align-self: stretch;

  //   height: 512px;
  box-sizing: content-box;
  //   margin-block: 32px;
  //   width: 100%;
  //   max-width: 960px;

  --bg-alpha: 30%;
  //   --border-alpha: 0%;

  background-color: rgba(var(--rgb) / var(--bg-alpha));

  &:hover {
    --bg-alpha: 50%;
  }

  //   @apply bg-black bg-opacity-75;
  //   @apply backdrop-filter backdrop-blur;

  //   background-color: black;
  //   border: 1px solid;
  //   border-color: white;
  //   padding-block: 12px;
  //   z-index: 0;
}
</style>
