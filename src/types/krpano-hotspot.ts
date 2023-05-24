// 按页面将热点分组
import type { KrpanoHotspot } from '@/lib/Hotspot/KrpanoHotspot'

export type Text = string | number
export type Position = {
  h: Text
  v: Text
}
export type Size = {
  width?: Text
  height?: Text
  scale: Text
}
export type HotspotType = 'image' | 'text' | 'html' | 'krpano' | 'container' | 'scrollarea' | 'iframe'
export type Config = {
  // 热点显示标题
  title: Text
  // 热点类型
  type: HotspotType
  // 热点坐标 h:水平 v:垂直
  position: Position
  size: Size
  // 关于热点的业务信息
  detail: any
  // 热点是否显示
  visible: boolean
  // 随视角缩放
  distorted: boolean
  url: null | string
  attr: any
}
export enum MethodType {
  JavaScript = 'JavaScript',
  Krpano = 'Krpano',
}

export interface Icon {
  url: string
  height: number
  width: number
  scale?: number
  style: number
}

type KrpanoMethod = string
type JSMethod = ((activeItem: KrpanoHotspot) => void)

export type ClickHandler = null | KrpanoMethod | JSMethod
