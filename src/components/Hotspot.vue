<script lang="ts" setup>
import { inject, useAttrs } from 'vue'
import useKrpEffect from '@/composables/useKrpEffect'
import { BaseHotspot } from '@/lib/Hotspot'
import type { KrpanoHelper } from '@/types/krpano'
import type { HotspotType } from '@/types/krpano-hotspot'

const props = defineProps<{
  title?: string
  type: HotspotType
  ath: number | string
  atv: number | string
  visible: boolean
  height?: number | string
  width?: number | string
  url?: string
}>()
const vueEmit = defineEmits(['click', 'hover', 'loaded'])
// 组件剩余Props参数
const attr = useAttrs()

const krpHotspot = new BaseHotspot({
  title: props.title,
  position: {
    h: props.ath,
    v: props.atv,
  },
  size: {
    height: props.height,
    width: props.width,
    scale: 1,
  },
  url: props.url,
  visible: props.visible,
  type: props.type,
  attr,
})

const krpHelper = inject<KrpanoHelper>('krpHelper')
if (!krpHelper)
  throw new Error('krpHelper is not provided')

useKrpEffect(() => {
  console.log('hotspot', krpHotspot)

  const krpInstance = krpHelper.getKrpInstance()
  krpHotspot.mountTo(krpInstance)
  krpHotspot.addToScene()
  krpHotspot.on('click', () => vueEmit('click', krpHotspot))
  krpHotspot.on('loaded', () => vueEmit('loaded', krpHotspot))
  krpHotspot.on('hover', () => vueEmit('hover', krpHotspot))
})
</script>

<template>
  <div />
</template>
