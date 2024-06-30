<script setup lang="ts">
import type { MediaIndexItem } from '@/components/data/MediaIndexProvider/MediaIndexProvider.vue'
import dayjs from 'dayjs'

defineProps<{
  data: string[]
}>()

function formatFileSize(bytes: number) {
  const kb = bytes / 1024
  //   const mb = kb / 1024

  return `${kb.toFixed(0)} kB`
}
</script>
<template>
  <ul class="media-list">
    <template v-for="(item, index) in data" :key="index">
      <RouterLink
        :to="{
          name: 'view-track',
          params: {
            trackId: item
          }
        }"
      >
        <li class="media-list-item">
          <VueFeather type="music" size="24" strokeWidth="1.5" />
          <div class="flex flex-col flex-grow mr-8 gap-1">
            <h6 class="text-2xl font-light">
              {{ item }}
            </h6>
            <span class="text-sm opacity-80">
              <strong>Created:</strong> {{ dayjs().format('YYYY. MMMM D. HH:mm') }}
            </span>
          </div>
          <!-- <span class="filesize"> -->
          <!-- {{ formatFileSize(item.size) }} -->
          <!-- </span> -->
          <span class="tag">
            <!-- {{ item.md5.substring(0, 8) }} -->
          </span>
        </li>
      </RouterLink>
    </template>
  </ul>
</template>
<style lang="scss">
.media-list {
  @apply flex flex-col;
  @apply bg-black bg-opacity-75;
  //   @apply gap-4;
  @apply px-8 py-4;
  margin-inline: auto;
}

.media-list-item {
  @apply flex items-center;
  @apply gap-6;
  @apply px-4 py-2;
  @apply transition-all;
  @apply border-l-2 border-transparent;

  --color: 255 255 255 cursor: pointer;

  color: rgba(var(--color) / 100%);

  &:hover {
    --color: var(--rgb);
    background-color: rgba(var(--rgb) / 10%);
    border-color: rgba(var(--rgb));
  }

  .filesize {
    @apply text-sm;
    @apply font-mono;
    font-weight: 400;
  }
}

.tag {
  @apply text-xs font-mono;
  @apply bg-lime-700 text-white;
  @apply rounded-full;
  padding: 1px 8px;
  font-weight: 300;
  letter-spacing: 1px;
}
</style>
