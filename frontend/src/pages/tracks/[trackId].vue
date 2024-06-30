<route lang="json">
{
  "props": true,
  "name": "view-track"
}
</route>
<script setup lang="ts">
import TrackAnnotations from '@/components/app/TrackAnnotations/TrackAnnotations.vue'
import TrackVersions from '@/components/app/TrackVersions/TrackVersions.vue'
import TrackData from '@/components/data/TrackData/TrackData.vue'

defineProps<{
  trackId: string
}>()
</script>
<template>
  <TrackData :track-id="trackId" v-slot="{ data }">
    <TrackVersions :data="data" />
    <div id="audio-viewer">
      <RouterView />
      <TrackAnnotations v-if="data" :data="data.annotations" />
    </div>
  </TrackData>
</template>
<style lang="scss"></style>
