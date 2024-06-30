<script setup lang="ts" generic="Results, Parameters">
import { onMounted, watch, computed } from 'vue'
import { shallowEquals, debounce as debounceFn } from '@/utils'
import { useAsyncLoader, type AsyncLoaderOptions } from './composables/useAsyncLoader'

interface LoaderProps<R, P> extends AsyncLoaderOptions<R, P> {
  args: P
  poll?: number | null
  debounce?: number
}

const props = withDefaults(defineProps<LoaderProps<Results, Parameters>>(), {
  poll: null,
  fallback: null
})

const emit = defineEmits<{
  (c: 'loaded', v: Results): any
}>()

const { data, pending, error, load, onLoad, executionCount } = useAsyncLoader(props)

onMounted(() => {
  load(props.args)
})

const reload = computed(() => {
  const baseFn = () => load(props.args)
  const debouncedFn = props.debounce ? debounceFn(baseFn, props.debounce) : baseFn
  return debouncedFn
})

watch(
  () => props.args,
  (newValue, oldValue) => {
    if (!shallowEquals(newValue, oldValue)) reload.value()
  }
)

onLoad((data) => {
  emit('loaded', data)

  if (props.poll) {
    setTimeout(() => reload.value(), props.poll)
  }
})

watch(
  () => props.poll,
  (newValue, oldValue) => {
    if (oldValue === null && newValue !== null) {
      reload.value()
    }
  }
)
</script>
<template>
  <slot v-bind="{ data, pending, error, executionCount, reload }" />
  <slot name="data" v-if="data !== null" :data :reload />
  <slot name="pending" v-if="pending" :reload />
  <slot name="error" v-if="error" :error :reload />
</template>
