<!-- eslint-disable vue/multi-word-component-names -->
<route lang="json">
{
  "name": "view-project",
  "props": true
}
</route>
<script setup lang="ts">
import { TracksByProjectId } from '@/components/data'
import { MediaList } from '@/components/app'

interface Props {
  projectId: string
}

defineProps<Props>()
</script>
<template>
  <TracksByProjectId v-slot="{ data }" :project-id>
    <MediaList :data="data" />
  </TracksByProjectId>
</template>
<style lang="scss"></style>
