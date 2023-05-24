import { mapKeys } from 'lodash-es'
import type { KrpanoProxy } from '../KrpanoProxy'
import type {
  KrpEventCallback,
} from '@/types/events'
import type {
  Config,
  Position,
} from '@/types/krpano-hotspot'

export class BaseHotspot {
  private config: Config = {
    type: 'image',
    title: '',
    position: {
      h: '0',
      v: '0',
    },
    size: {
      scale: 1,
    },
    detail: null,
    visible: false,
    distorted: false,
    url: null,
    attr: {},
  }

  public name: string

  constructor(cfg: Partial<Config>) {
    // 热点名字重复会导致显示不出来
    this.name = `p_${cfg.title}_${Math.random().toString(36).substr(2, 9)}`
    this.config = Object.assign({}, this.config, cfg)
  }

  private krpano: KrpanoProxy | null = null
  setPosition(position: Position) {
    this.config.position = position
  }

  addToScene() {
    const {
      position, title, visible,
      size,
      url,
      type,
      distorted,
      attr,
    } = this.config
    const krpano = this.krpano!
    krpano.call(`addhotspot(${this.name})`)
    // 设置热点图片（分为需要单独设置图片和使用默认样式图片）
    krpano.set({
      [`hotspot[${this.name}].url`]: url,
      [`hotspot[${this.name}].ath`]: position.h,
      [`hotspot[${this.name}].atv`]: position.v,
      [`hotspot[${this.name}].edge`]: 'top',
      [`hotspot[${this.name}].height`]: size.height,
      [`hotspot[${this.name}].width`]: size.width,
      [`hotspot[${this.name}].scale`]: size.scale,
      [`hotspot[${this.name}].html`]: title,
      [`hotspot[${this.name}].type`]: type,

      ...mapKeys(attr, (value, key) => `hotspot[${this.name}].${key}`),
    })
    // 构建热点样式 热点样式名 add_icon_style_1 在 public/vtour/skinxml/hotspot_style.xml 中定义
    // krpano.set(`hotspot[${this.name}].onloaded`, 'add_icon_style_1()')
    krpano.set(`hotspot[${this.name}].title`, title)
    // // 热点分组，方便js控制批量显示隐藏
    krpano.set(`hotspot[${this.name}].distorted`, distorted)
    krpano.set(`hotspot[${this.name}].visible`, visible)
  }

  mountTo(krp: KrpanoProxy) {
    this.krpano = krp
  }

  on(event: string, cb: KrpEventCallback) {
    const krpano = this.krpano!
    console.log('register event', event)

    const fn = `hotspot_${this.name}_${event}`
    const eventsHandler = `js(KrpInstance.emit(${fn}, name))`
    const hotspot = krpano.get(`hotspot[${this.name}]`)

    window.KrpInstance?.on(fn, cb)
    hotspot.addevent(`on${event}`, eventsHandler)
    // krpano.set(`hotspot[${this.name}].onloaded`, eventsHandler)
  }
}

