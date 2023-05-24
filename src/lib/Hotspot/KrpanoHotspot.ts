import { isFunction } from 'lodash-es'
import { globalIconStyle, iconMap } from '@/assets/data/hotspot-style'
import { IconGroup, MethodType } from '@/types/krpano-hotspot'
import type {
  ClickHandler, IconDetail,
  IconMap,
} from '@/types/krpano-hotspot'
type Position = any
type Config = {
  // 热点显示标题
  title: string
  // 热点坐标 h:水平 v:垂直
  position: Position
  // 关于热点的业务信息
  detail: IconDetail
  // 处理点击回调
  clickHandler: ClickHandler
  // 是否显示
  visible: boolean
  // 点击热点后跳转到的场景
  linkedScene: string
  // 热点图片
  iconUrl: string | null
}

export class KrpanoHotspot {
  private config: Config = {

  }

  constructor(cfg: Partial<Config>) {
    // 热点名字重复会导致显示不出来
    this.hs_name = `p_${name}_${Math.random().toString(36).substr(2, 9)}`
  }

  public hs_name: string
  public linkedScene = ''

  public group: IconGroup = IconGroup.anonymous
  setPosition(position: { h: string; v: string }) {
    this.position = position
  }

  private iconUrl: string | null = null
  public visible = false
  setIconUrl(url: string) {
    this.iconUrl = url
  }

  getIconUrl() {
    return this.iconUrl || iconMap[this.type].url
  }

  setGroup(group: IconGroup) {
    this.group = group
  }

  setType(type: keyof IconMap) {
    this.type = type
  }

  getIconStyle() {
    return iconMap[this.type].style
  }

  // 区分热点事件处理函数执行环境
  private clickHandlerType: MethodType = MethodType.JavaScript

  setClickHandler(clickHandler: ClickHandler) {
    this.clickHandler = clickHandler
  }

  setClickHandlerType(type: MethodType) {
    this.clickHandlerType = type
  }

  getClickHandler() {
    if (this.clickHandler === null)
      return
    if (this.clickHandlerType === MethodType.JavaScript) {
      // 绑定 javascript 方法必须挂到window上
      // 热点点击事件处理函数 接收参数：事件当前点击的hotspot
      const clickHandler = isFunction(this.clickHandler) && this.clickHandler.bind(this, this)
      const methodName = `${this.hs_name}clickHandler`
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window[methodName] = clickHandler
      return `js(${methodName})`
    }
    else if (this.clickHandlerType === MethodType.Krpano) {
      return this.clickHandler
    }
  }

  setIconDetail(iconDetail: IconDetail) {
    this.iconDetail = iconDetail
  }

  getHeight() {
    return iconMap[this.type].height || globalIconStyle.height
  }

  getWidth() {
    return iconMap[this.type].width || globalIconStyle.width
  }

  getScale() {
    return iconMap[this.type].scale || globalIconStyle.scale
  }

  getTitle() {
    return this.iconDetail?.title || this.name
  }
}

export type Hotspot = KrpanoHotspot
