import { nextTick, ref, unref } from 'vue'
import type { Config, KrpGlobal, KrpInitCallback, KrpReadyCallback, KrpanoHelper } from '@/types/krpano'
import type { KrpHotspot } from '@/lib/Hotspot'
import { events } from '@/lib/Events'
import { KrpanoProxy } from '@/lib/KrpanoProxy'

const krpanoInstance = ref<KrpanoInstance | null>(null)
let initLock = false
export const useKrpano = (cfg?: Config) => {
  /**
   * @description: 初始化krpano
   * @param onready 初始化成功回调
   */
  async function initPano(onready: KrpInitCallback) {
    if (initLock)
      return
    initLock = true
    const objEl = document.querySelector('#krpanoSWFObject')

    if (krpanoInstance.value && objEl) {
      initLock = false
      return onready(krpanoInstance)
    }

    if (!document.querySelector('#pano'))
      await nextTick()
    if (!document.querySelector('#pano')) {
      console.warn('#pano 元素不存在！')
      initLock = false
      return
    }

    const swf = cfg.swf || `${import.meta.env.BASE_URL}vtour/krpano.swf` // path to flash viewer (use null if no flash fallback will be requiered)
    const xml = cfg.xml || `${import.meta.env.BASE_URL}vtour/tour.xml`
    window?.embedpano?.({
      id: 'krpanoSWFObject',
      swf,
      xml,
      target: 'pano',
      consolelog: true, // trace krpano messages also to the browser console
      onready: (nativeInstance: KrpanoInstance) => {
        const instance = new KrpanoProxy(nativeInstance)
        krpanoInstance.value = instance
        window.KrpInstance = instance
        onready(instance)
        initLock = false
      },
    })
  }
  function destroyPano() {
    krpanoInstance.value = null
  }

  const getGlobalApi = () => {
    return krpanoInstance.value.get('global') as KrpGlobal
  }

  /**
   * 调用krpano方法
   * @param method xml中定义的方法<action name="methodName">名
   */
  const callMethod = async (method: string) => {
    if (krpanoInstance.value === null)
      await nextTick()
    if (krpanoInstance.value === null)
      throw new Error('krpano 载入失败，位置 useKrpano.ts')

    return krpanoInstance.value.call(method)
  }
  const loadScene = async (sceneName: string) => {
    console.log('loadScene: ', sceneName)
    return await callMethod(`MoveToScene(${sceneName})`)
  }
  /**
   * 添加热点
   * @description 注意：热点默认初始不展示，需要切换分组展示对应分组
   * @param position 球面坐标
   * @param type 热点类型
   * @param clickHandler 点击事件处理函数，需要挂到window对象
   * @param krpanoHotspot 热点实例
   */

  async function addHotspot(hotspot: KrpHotspot) {
    const krpano = unref(krpanoInstance)
    if (!krpano)
      await nextTick()
    if (!krpano)
      throw new Error('krpano 载入失败，位置 useKrpano.ts')
    const hs_name = hotspot.hs_name
    krpano.call(`addhotspot(${hs_name})`)
    // 设置热点图片（分为需要单独设置图片和使用默认样式图片）
    krpano.set(`hotspot[${hs_name}].url`, hotspot.getIconUrl())
    krpano.set(`hotspot[${hs_name}].ath`, hotspot.position.h)
    krpano.set(`hotspot[${hs_name}].atv`, hotspot.position.v)
    krpano.set(`hotspot[${hs_name}].height`, hotspot.getHeight())
    krpano.set(`hotspot[${hs_name}].width`, hotspot.getWidth())
    krpano.set(`hotspot[${hs_name}].scale`, hotspot.getScale())
    krpano.set(`hotspot[${hs_name}].edge`, 'bottom')
    // 构建热点样式 热点样式名 add_icon_style_1 在 public/vtour/skinxml/hotspot_style.xml 中定义
    krpano.set(`hotspot[${hs_name}].onloaded`, `add_icon_style_${hotspot.getIconStyle()}()`)
    krpano.set(`hotspot[${hs_name}].title`, hotspot.getTitle())
    // 热点分组，方便js控制批量显示隐藏
    krpano.set(`hotspot[${hs_name}].hot_group`, hotspot.group)
    krpano.set(`hotspot[${hs_name}].distorted`, false)
    krpano.set(`hotspot[${hs_name}].visible`, hotspot.visible)

    // 添加点击事件
    const handler = hotspot.getClickHandler()
    if (handler)
      krpano.set(`hotspot[${hs_name}].onclick`, handler)
  }

  const helper: KrpanoHelper = {
    loadScene,
    callMethod,
    getGlobalApi,
    addHotspot,
    getKrpInstance: () => krpanoInstance.value,
  }

  return {
    addHotspot,
    initPano,
    destroyPano,
    krpanoInstance,
    helper,
  }
}

