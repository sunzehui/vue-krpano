<script lang="ts" setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped>
.container-pano {
  height: 100%;
  width: 100%;
  z-index: 1;
  position: relative;

  background: #aaa;

}

.stage-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  overflow: hidden;
  pointer-events: none;

}
</style>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 5s ease-in-out;
  will-change: opacity;
  position: fixed;
  z-index: 99999;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.fade-leave-to {
  opacity: 1;
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}
</style>
