<script setup lang="ts">
import { PendingOverlay } from '@/components/ui'
import { AsyncLoader } from '@/components/utility'

interface Props {
  projectId: string
}

const props = defineProps<Props>()

async function get(): Promise<string[]> {
  const response = await fetch('/api/v1/projects/' + props.projectId)

  const json = await response.json()

  return json.tracks
}
</script>
<template>
  <AsyncLoader
    :fn="get"
    :debounce="600"
    :args="{
      projectId
    }"
    v-slot="{ data, pending }"
  >
    <slot v-if="data" v-bind="{ data }" />
    <Transition name="fade">
      <PendingOverlay v-if="pending" />
    </Transition>
  </AsyncLoader>
</template>
<style lang="scss"></style>
