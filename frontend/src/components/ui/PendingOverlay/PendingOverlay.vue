<script setup lang="ts">
/**
 * SOURCE: https://cssloaders.github.io/
 */
</script>
<template>
  <div
    class="spinner-backdrop"
    :style="{
      '--size': '48px',
      '--thickness': '4px'
    }"
  >
    <span class="spinner" style="--size: 128px; --thickness: 2px" />
    <span class="spinner" style="--size: 118px; --thickness: 4px" />
    <!-- <span class="spinner" style="--size: 106px; --thickness: 2px" /> -->
  </div>
</template>
<style lang="scss">
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.spinner-backdrop {
  --color-primary: var(--rgb);
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: rgba(0 0 0 /10%);
}

.spinner {
  border-radius: var(--size);
  width: var(--size);
  height: var(--size);

  display: inline-block;
  box-sizing: border-box;
  position: absolute;

  transform-origin: center center;

  animation-name: rotate;
  animation-duration: 1500ms;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  border: var(--thickness) solid transparent;

  &:nth-of-type(even) {
    border-inline-color: rgba(var(--color-primary) / 100%);
  }

  &:nth-of-type(odd) {
    border-block-color: rgba(255 255 255 / 100%);
    animation-direction: reverse;
  }
}
</style>
