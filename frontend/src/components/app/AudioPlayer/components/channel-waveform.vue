<script setup lang="ts">
import { computed } from 'vue'
import { useWaveformSvg } from './useWaveformSvg'
/*
 TODO: Externalize 
 */
export interface AudioChannelPeaks {
  length: number
  bits: number
  min: number[]
  max: number[]
}

export interface WaveformProps extends AudioChannelPeaks {}

const props = defineProps<WaveformProps>()

const pathD = computed(() => {
  return useWaveformSvg(props)
})
</script>
<template>
  <svg
    :viewBox="`0 ${-(2 ** bits / 2)} ${length} ${2 ** bits}`"
    class="waveform"
    preserveAspectRatio="none"
  >
    <path :d="pathD" class="waveform-path" />
  </svg>
</template>
<style lang="scss">
.waveform {
  height: var(--ch-height, 256px);
  width: 100%;

  padding-block: 4px;

  background: rgba(0 0 0 / 40%);
}

.waveform-path {
  @apply transition-all;
  stroke: rgb(var(--rgb));
  fill: rgb(var(--rgb));
  //   stroke-opacity: 60%;
  stroke-opacity: 0%;
  fill-opacity: 80%;
}
</style>
