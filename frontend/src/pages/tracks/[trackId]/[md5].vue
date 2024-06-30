<!-- eslint-disable vue/multi-word-component-names -->
<route lang="json">
{
  "name": "view-track-version",
  "props": true
}
</route>
<script setup lang="ts">
import { AudioPlayer } from '@/components/app'

/**
 * TODO: refactor duplicated usage of TrackData component
 */
import TrackData from '@/components/data/TrackData/TrackData.vue'

interface Props {
  md5: string
  trackId: string
}

const props = defineProps<Props>()
</script>
<template>
  <TrackData :trackId v-slot="{ data }">
    <AudioPlayer :file-id="md5" :annotations="data.annotations" />
  </TrackData>
</template>
<style lang="scss"></style>
