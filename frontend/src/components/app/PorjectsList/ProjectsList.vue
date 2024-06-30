<script setup lang="ts">
import type { ProjectMetadata } from '@/api/types'

import ProjectsListItem from './components/ProjectsListItem.vue'

defineProps<{
  data: ProjectMetadata[]
}>()
</script>
<template>
  <ul class="projects-list">
    <template v-for="(folder, i) in data" :key="i">
      <!-- {{ folder }} -->
      <ProjectsListItem v-bind="folder" />
    </template>
  </ul>
</template>
<style lang="scss">
.projects-list {
  @apply flex p-2 gap-4 items-start;
  @apply bg-black bg-opacity-75;
  @apply px-8 py-4;
  margin-inline: auto;
}
</style>
