<script setup lang="ts">
// const props = defineProps<{}>()
</script>
<template>
  <ul class="audio-metadata">
    <li>
      <span>MP3</span>
    </li>
    <li>
      <span>320kbps</span>
    </li>
    <li>
      <span>44.1kHz</span>
    </li>
  </ul>
</template>
<style lang="scss">
.audio-metadata {
  @apply flex flex-row;
  @apply font-mono;
  @apply text-sm;
  @apply gap-4;
  font-weight: 300;

  li {
    @apply rounded-full;
    @apply px-4;

    background-color: rgba(var(--rgb) / 50%);
  }
}
</style>
