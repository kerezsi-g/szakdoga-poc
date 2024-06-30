<script setup lang="ts">
import type { TrackAnnotations } from '@/components/data/TrackData/TrackData.vue'
import { formatTimestamp } from '@/utils'

const props = defineProps<{
  data: TrackAnnotations
}>()
</script>
<template>
  <aside id="annotations-list">
    <header>
      <VueFeather type="list" size="24" strokeWidth="2" />
      ANNOTATIONS
    </header>
    <ul class="markers-list">
      <li class="markers-list-item" v-for="marker in props.data.markers" :key="marker.at">
        <span class="timestamp"> {{ formatTimestamp(marker.at) }} </span>
        <span> Marker text </span>
      </li>
    </ul>
  </aside>
</template>
<style lang="scss"></style>
