import type { IKrpanoConfig, krpanoProxy } from './types/krpano'

declare global {
  interface Window {
    embedpano?: (config: IKrpanoConfig) => void
    KrpInstance?: krpanoProxy
  }
}

export { }
