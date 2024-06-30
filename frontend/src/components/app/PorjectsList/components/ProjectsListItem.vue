<script setup lang="ts">
import type { ProjectMetadata } from '@/api/types'
// import dayjs from 'dayjs'

defineProps<ProjectMetadata>()
</script>
<template>
  <RouterLink
    :to="{
      name: 'view-project',
      params: { projectId }
    }"
  >
    <li class="projects-list-item">
      <VueFeather
        type="folder"
        size="64"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="0.5"
        fill="currentColor"
      />

      <h6>
        {{ projectName }}
      </h6>

      <!-- <span>
        {{ dayjs(lastModified).format('YYYY-MM-DD ') }}
      </span> -->
    </li>
  </RouterLink>
</template>
<style lang="scss">
.projects-list-item {
  @apply flex flex-col;
  @apply px-6 py-2;
  @apply items-center justify-start;

  //   @apply bg-white bg-opacity-20;
  @apply backdrop-filter backdrop-blur;

  @apply transition-all;

  cursor: pointer;

  //   border: 1px solid currentColor;

  &:hover {
    color: rgba(var(--rgb) / 100%);
    background-color: rgba(var(--rgb) / 25%);
  }

  h6 {
    @apply text-lg;
    font-weight: 400;
  }
}
</style>
