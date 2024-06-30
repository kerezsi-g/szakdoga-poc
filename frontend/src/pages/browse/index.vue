<!-- eslint-disable vue/multi-word-component-names -->
<route lang="json">
{
  "name": "projects-list"
}
</route>
<script setup lang="ts">
import MediaList from '@/components/app/MediaList/MediaList.vue'
import { ProjectsList } from '@/components/app/PorjectsList'
import { MediaIndexProvider } from '@/components/data/TracksByProjectId'
import AsyncLoader from '@/components/utility/AsyncLoader/AsyncLoader.vue'

async function getProjects() {
  const response = await fetch('/api/v1/users/testclient/projects')

  const json = await response.json()

  return json
}
</script>
<template>
  <AsyncLoader :fn="getProjects" :args="{}">
    <template #data="{ data }">
      <ProjectsList :data="data" />
    </template>
  </AsyncLoader>
</template>
<style lang="scss"></style>
