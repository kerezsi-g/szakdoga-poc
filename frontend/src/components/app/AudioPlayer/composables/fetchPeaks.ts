import type { Peaks } from '@/api/types'
import { HttpGet } from '@/utils/http'

export async function fetchPeaks(fileId: string) {
  const peaks = await HttpGet<Peaks>(`/api/v1/media/${fileId}/peaks?resolution=4096&bits=8`)

  return peaks
}
