<script setup lang="ts" generic="T">
import { ref } from 'vue'

const props = defineProps<{
  value?: T
  action?: ((v: T) => any) | ((v: T) => Promise<any>)
}>()

const emit = defineEmits<{
  (c: 'click', e: MouseEvent): unknown
}>()

const pending = ref(false)

function handleClick(e: MouseEvent) {
  emit('click', e)

  if (props.action) {
    const promise = props.action(props.value!)

    if (promise instanceof Promise) {
      pending.value = true
      promise.finally(() => {
        pending.value = false
      })
    }
  }
}
</script>
<template>
  <button class="v-button" @click="handleClick" :disabled="pending">
    <!-- <span class="v-button-text"> -->
    <slot />
    <!-- </span> -->
  </button>
</template>
<style lang="scss">
.v-button {
  @apply py-2 px-4 gap-2;
  @apply rounded-sm;
  @apply transition-all;
  //   --rgb: 56 189 248;
  --bg-alpha: 70%;
  --ring: 2px;
  position: relative;
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;
  line-height: normal;

  background-color: rgba(var(--rgb) / var(--bg-alpha));

  &:hover {
    --bg-alpha: 80%;
  }

  &:active {
    --bg-alpha: 90%;
    box-shadow: 0px 0px 0px var(--ring) rgba(var(--rgb) / 60%);
  }
}
</style>
