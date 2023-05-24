<script lang="ts" setup>
import { provide } from 'vue'
import { useKrpano } from '@/composables/useKrpano'
import { getCmpUid } from '@/utils/tools'
import { useKrpLifecycle } from '@/composables/useKrpLifecycle'
const props = defineProps({
  xml: {
    type: String,
    required: true,
  },
  swf: {
    type: String,
    required: true,
  },
})

const vueEmit = defineEmits(['loaded'])

// 获取该组件uid
const uid = getCmpUid()
// 向全局发送init事件
const { ready } = useKrpLifecycle()
// 初始化krpano，并获取helper
const { initPano, helper } = useKrpano({
  xml: props.xml,
  swf: props.swf,
})

// 初始化krpano后向全局发送init事件
initPano((krpInstance) => {
  ready({
    krpInstance,
  })
  vueEmit('loaded', krpInstance)
})
// 向子组件提供helper
provide('krpHelper', helper)
// 向子组件提供父组件uid,方便监听父组件加载结束事件
provide('parentUidGetter', uid)
</script>

<template>
  <div class="container-pano">
    <div class="stage-container">
      <slot />
    </div>
    <div id="pano" style="height: 100%;" />
  </div>
</template>

<style lang="scss" scoped>
.container-pano {
  height: 100%;
  width: 100%;
  z-index: 1;
  position: fixed;
  left: 0;
  right: 0;
}

.stage-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  overflow: hidden;
  pointer-events: none;
}

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
