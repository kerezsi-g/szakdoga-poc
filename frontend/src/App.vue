<script setup lang="ts">
import { NavBar } from '@/components/app'
import Background from '@/components/app/Background/Background.vue'
</script>
<template>
  <NavBar />
  <main id="inner">
    <RouterView />
  </main>
</template>
<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;

body,
html {
  height: 100%;
  width: 100%;
  font-family: 'Barlow';
}

#app {
  padding: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  background-image: url('/img/background.jpg');
  background-size: cover;
  background-position: center center;
  //   background-clip: border-box;
  @apply text-white;

  //   --rgb: 190 210 230; //desaturated
  //   --rgb: 56 189 248; // blueish
  //   --rgb: 245 158 11; // amber
  //   --rgb: 132 204 22; // lime
  //   --rgb: 34 197 94; // green
  --rgb: 16 185 129; // emerald
  //   --rgb: 20 184 166; // teal
  //   --rgb: 6 182 212; // cyan
  //   --rgb: 14 165 233; // sky
  //   --rgb: 233 16 48; // red
  //   --rgb: 124 58 237; // purps
}
#inner {
  @apply flex flex-col  flex-grow;
  @apply items-stretch justify-center;
  @apply backdrop-filter backdrop-blur-lg;
}
</style>
