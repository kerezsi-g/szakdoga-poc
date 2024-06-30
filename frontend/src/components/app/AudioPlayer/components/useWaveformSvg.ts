import type { AudioChannelPeaks } from './channel-waveform.vue'

export function useWaveformSvg(params: AudioChannelPeaks): string {
  const { length, bits, min, max } = params

  const height = 2 ** bits

  let pathD = `M0,${height / 2}` // Start in the middle

  // Index variable, we'll reuse this for a reversed iteration
  let i: number

  // Draw the upper edge of the waveform
  for (i = 0; i < length; i++) {
    pathD += ` L${i},${max[i]}`
  }

  // Draw the lower edge of the waveform
  for (i = length - 1; i >= 0; i--) {
    pathD += ` L${i},${min[i]}`
  }

  pathD += ` L0,${height / 2} Z` // End back in the middle and close

  return pathD
}
