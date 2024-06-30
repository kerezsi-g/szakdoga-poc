<script setup lang="ts">
import { AsyncLoader } from '@/components/utility'

interface Props {
  trackId: string
  //   projectId: string
}

export type TrackVersion = {
  created: Date
  md5: string
  size: number
}

export type TrackMarker = {
  at: number
  type: string
  text: string
}

export type TrackAnnotations = {
  markers: TrackMarker[]
  regions: any
}

export type TrackData = {
  trackId: string
  versions: TrackVersion[]
  annotations: TrackAnnotations
}

const props = defineProps<Props>()

async function getData({ trackId }: Props) {
  const response = await fetch(`/api/v1/tracks/${trackId}`)

  const json = await response.json()

  return json as TrackData
}
</script>
<template>
  <AsyncLoader :fn="getData" :args="{ ...$props }">
    <template #data="{ data }">
      <slot :data />
    </template>
  </AsyncLoader>
</template>
<style lang="scss"></style>
