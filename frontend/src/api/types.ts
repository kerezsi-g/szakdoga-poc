export type Peaks = {
  bits: number
  length: number
  chunkSize: number
  peaks: {
    channel: number
    min: number[]
    max: number[]
  }[]
}

export interface ProjectMetadata {
  projectId: string
  projectName: string
  created: Date
}
