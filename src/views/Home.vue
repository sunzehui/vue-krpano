<script lang="ts" setup>
import Krpano from '@/components/Krpano.vue'
import Scene from '@/components/Scene.vue'
import Hotspot from '@/components/Hotspot.vue'
import type { KrpanoHotspot } from '@/lib/Hotspot/KrpanoHotspot'
import type { KrpanoProxy } from '@/lib/KrpanoProxy'

function hotspotClicked(hotspot: KrpanoHotspot) {
  console.log('hotspot clicked', hotspot)
}
const sceneTestXML = `
  <preview url="/vtour/panos/preview.jpg" />
`

function handleSceneLoaded() {
  // alert('scene loaded')
}
function handleKrpanoLoaded({ krpInstance }: { krpInstance: KrpanoProxy }) {
  krpInstance.call('startup')
}
</script>

<template>
  <div class="page-home">
    <Krpano xml="/vtour/tour.xml" swf="/vtour/tour.swf" @loaded="handleKrpanoLoaded">
      <Scene name="test" title="scene1" :content="sceneTestXML" @loaded="handleSceneLoaded">
        <Hotspot
          type="text" title="我是热点" :visible="true" ath="0" atv="0" att="false"
          @click="hotspotClicked"
        />
      </Scene>
    </Krpano>
  </div>
</template>

<style lang="scss" scoped>
.page-home{
  min-height: 100%;
}
</style>
