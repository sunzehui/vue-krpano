## vue-krpano

```html
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
```
