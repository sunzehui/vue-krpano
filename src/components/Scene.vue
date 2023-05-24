<script lang="ts" setup>
import { inject, provide, useSlots } from 'vue'
import type { KrpanoHelper } from '@/types/krpano'
import useKrpEffect from '@/composables/useKrpEffect'
import { getCmpUid } from '@/utils/tools'
import { useKrpLifecycle } from '@/composables/useKrpLifecycle'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
})

const vueEmit = defineEmits(['loaded'])

const krpHelper = inject<KrpanoHelper>('krpHelper')
const uid = getCmpUid()

const { ready } = useKrpLifecycle()

const buildSceneXML = (xml?: string) => {
  return `
      ${xml || ''}
      <events onloadcomplete="js(
        KrpInstance.emit('scene_init__${props.name}')
      )" />
  `
}

useKrpEffect(async (r) => {
  console.log('scene effect', r.krpInstance)

  const global = await krpHelper?.getGlobalApi()
  global.set(`scene[${props.name}].content`, buildSceneXML(props.content))
  krpInstance.on(`scene_init__${props.name}`, () => {
    console.log('scene loaded')

    ready({
      sceneInstance: global.get(`scene[${props.name}]`),
    })
    vueEmit('loaded')
  })
})

provide('parentUidGetter', uid)
</script>

<template>
  <div>
    <slot />
  </div>
</template>
