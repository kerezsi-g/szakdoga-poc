<!-- eslint-disable vue/multi-word-component-names -->
<route lang="json">
{
  "name": "login"
}
</route>
<script setup lang="ts">
import { BrandLogo } from '@/components/app'
import { VButton, VInput } from '@/components/ui'
</script>
<template>
  <div class="login-form">
    <BrandLogo class="bg-black bg-opacity-40" />
    <div class="flex flex-col gap-8 px-12 py-8">
      <v-input label="E-MAIL" />
      <v-input label="PASSWORD" />
      <VButton>
        <span class="inline-block">SIGN IN</span>
        <VueFeather type="chevrons-right" size="20" />
      </VButton>
    </div>
  </div>
</template>
<style lang="scss">
.login-form {
  @apply bg-black bg-opacity-75;
  @apply backdrop-filter backdrop-blur-lg;
  @apply rounded;
  @apply shadow-xl;

  @apply flex flex-col;
  //   @apply px-12 py-6 gap-4;

  min-width: 360px;

  justify-self: center;
  align-self: center;
  overflow: hidden;

  margin: auto;
}
</style>
