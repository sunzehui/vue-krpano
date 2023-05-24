import type { BaseHotspot } from '@/lib/Hotspot/Hotspot'
import type { KrpanoProxy } from '@/lib/KrpanoProxy'

export type KrpGlobal = any

/**
 * @see https://krpano.com/docu/html/#wmode
 */
export interface IKrpanoConfig {
  /**
   * 全景图xml路径。需要手动设置为null才不会加载。
   * @see https://krpano.com/docu/html/#xml
   */
  xml?: string | null
  /**  挂载点id */
  target?: string
  swf?: string
  id?: string
  bgcolor?: string
  /**
   * @see https://krpano.com/docu/html/#html5
   */
  html5?: string
  flash?: string
  wmode?: string
  localfallback?: string
  vars?: Record<string, unknown>
  initvars?: Record<string, unknown>
  consolelog?: boolean
  basepath?: string
  mwheel?: boolean
  capturetouch?: boolean
  focus?: boolean
  webglsettings?: Record<string, unknown>
  webxr?: string
  mobilescale?: number
  touchdevicemousesupport?: boolean
  fakedevice?: string
  onready?: (renderer: KrpInstance) => void
}

export interface KrpInstance {
  get(key: string): any
  set(key: string, value: any): any
  call(action: string): void

}

export interface KrpanoHelper {
  loadScene: (sceneName: string) => Promise<void>
  callMethod: (method: string) => Promise<void>
  getGlobalApi: () => KrpGlobal
  addHotspot: (hotspot: BaseHotspot) => Promise<void>
  getKrpInstance: () => KrpanoProxy

}

export type Config = IKrpanoConfig
interface EventDetail {
  krpInstance: KrpanoProxy
}
export type KrpReadyCallback = (eventDetail: EventDetail) => void

export type KrpInitCallback = (krpInstance: KrpanoProxy) => void
