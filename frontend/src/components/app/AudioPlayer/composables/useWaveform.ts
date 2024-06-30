import WaveformData from './example.json'

export function useWaveform(dat = WaveformData) {
  console.log(dat.length, dat.data.length)

  const { data, bits } = dat

  const leftMax = []
  const leftMin = []

  const rightMax = []
  const rightMin = []

  for (let i = 0; i < data.length; i += 4) {
    leftMin.push(data[i])
    leftMax.push(data[i + 1])
    rightMin.push(data[i + 2])
    rightMax.push(data[i + 3])
  }

  const svg = {
    height: 2 ** bits,
    width: leftMin.length,
    left: generatePath([leftMax, leftMin], leftMin.length, 2 ** bits),
    right: generatePath([rightMax, rightMin], rightMin.length, 2 ** bits)
  }

  return svg
}
function generatePath(amplitudeData: [number[], number[]], width: number, height: number): string {
  const [upper, lower] = amplitudeData

  let pathD = `M0,${height / 2}` // Start in the middle

  for (let i = 0; i < upper.length; i++) {
    // const x = (i / (normalizedData.length - 1))
    pathD += ` L${i},${upper[i]}`
  }

  for (let i = lower.length - 1; i >= 0; i--) {
    // const x = (i / (normalizedData.length - 1))
    pathD += ` L${i},${lower[i]}`
  }

  pathD += ` L0,${height / 2} Z` // End back in the middle and close

  return pathD
}
