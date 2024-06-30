<script setup lang="ts">
import type { TrackData } from '@/components/data/TrackData/TrackData.vue'
import { onMounted } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'

const props = defineProps<{
  data: TrackData
}>()

onMounted(() => {
  const router = useRouter()
  const route = useRoute()
  router.replace({
    name: 'view-track-version',
    params: {
      md5: props.data.versions[0].md5
    }
  })
})
</script>
<template>
  <header class="view-track-header">
    <h1>{{ data.trackId }}</h1>

    <nav>
      <strong> Versions: </strong>
      <ul>
        <RouterLink
          v-for="version in data.versions"
          :key="version.md5"
          :to="{
            name: 'view-track-version',
            params: { trackId: data.trackId, md5: version.md5 }
          }"
          class="tag"
        >
          {{ version.md5.slice(0, 8) }}
          <!-- <VueFeather type="chevron-right" size="32" stroke-width="1" /> -->
        </RouterLink>
      </ul>
    </nav>
  </header>
</template>
<style lang="scss">
.view-track-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: start;

  @apply bg-stone-800;
  @apply px-8 py-4;
  //   background-color: rgba(var(--rgb));

  h1 {
    @apply text-3xl;
    @apply border-b;
  }

  nav {
    @apply flex flex-row gap-4;
  }
}
</style>
