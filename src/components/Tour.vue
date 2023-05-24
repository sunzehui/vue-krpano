<script lang="ts" setup>
import { useKrpano } from '@/composables/useKrpano'

useKrpano()
</script>

<template>
  <div id="pano" style="height: 100%;" />
</template>

<style lang="scss" scoped>
#pano {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
}
</style>
