import { inject, onUnmounted } from 'vue'
import { useKrpEvents } from './useKrpEvents'
import type { KrpInstance, KrpReadyCallback } from '@/types/krpano'
import { getCmpUid } from '@/utils/tools'

function useKrpEffect(cal: KrpReadyCallback) {
  const { on, off } = useKrpEvents()
  const getKrpInstance = inject('getKrpInstance') as () => KrpInstance
  const parentUidGetter = inject('parentUidGetter') as number | void

  const uid = parentUidGetter || getCmpUid()
  const map = getKrpInstance?.()
  const eventKey = `__initd__${uid}`
  let onUnmountedCallback: void | VoidFunction
  const _cal = (KrpInstance: any) => {
    onUnmountedCallback = cal(KrpInstance)
  }
  if (map) {
    console.log('map-loaded', map)
    _cal({ map })
  }
  else {
    console.log('listen-map', eventKey)
    on(eventKey, _cal)
  }
  onUnmounted(() => {
    off(eventKey, _cal)
    onUnmountedCallback && onUnmountedCallback()
  })
}

export default useKrpEffect
