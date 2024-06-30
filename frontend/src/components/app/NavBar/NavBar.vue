<script setup lang="ts">
import { BrandLogo } from '../'

// const props = defineProps<{}>()
</script>
<template>
  <nav id="navbar">
    <RouterLink
      :to="{
        name: 'projects-list'
      }"
    >
      <BrandLogo />
    </RouterLink>
  </nav>
</template>
<style lang="scss">
#navbar {
  @apply bg-black bg-opacity-80;
  @apply backdrop-filter backdrop-blur-md;
}
</style>
