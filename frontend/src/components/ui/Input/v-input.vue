<script setup lang="ts">
const props = defineProps<{
  label?: string
}>()

const model = defineModel()
</script>
<template>
  <label class="v-input-container">
    <span v-if="label || $slots.label" class="v-input-label">
      <slot name="label">
        {{ label }}
      </slot>
    </span>
    <span class="v-input">
      <input v-model="model" />
    </span>
  </label>
</template>
<style lang="scss">
.input-label {
  font-weight: 200;
}

.v-input-container {
  @apply flex flex-col;
}

.v-input {
  @apply transition-all;
  @apply rounded-sm;
  @apply px-4 py-2;

  --bg-alpha: 0;
  --border-alpha: 0.5;
  --ring: 2px;
  --ring-alpha: 40%;
  --color: 255 255 255;

  margin-block: var(--ring);

  border: 1px solid rgba(var(--color) / var(--border-alpha));
  background: rgba(0 0 0 / 25%);

  &:focus-within {
    --color: var(--rgb);
  }

  &:hover {
    --border-alpha: 0.65;
    background: rgba(var(--rgb) / 10%);
  }

  &:focus-within {
    --border-alpha: 0.8;
    --bg-alpha: 0.1;
    box-shadow: 0px 0px 0px var(--ring) rgba(var(--rgb) / 40%);
    background: rgba(var(--rgb) / 10%);
  }

  input {
    background: none;
    border: none;
    outline: none;
  }
}
</style>
