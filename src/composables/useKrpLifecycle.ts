import { inject, onUnmounted } from 'vue'
import { useKrpEvents } from './useKrpEvents'
import { getCmpUid } from '@/utils/tools'

export const useKrpLifecycle = () => {
  const { emit, off } = useKrpEvents()

  const uid = getCmpUid()
  const krpInstance = inject('krpInstance')
  const eventKey = `__initd__${uid}`

  function ready(eventDetail?: any) {
    console.log('emit ', eventDetail)

    emit(eventKey, {
      krpInstance: eventDetail.krpInstance || krpInstance,
      ...eventDetail,
    })
  }
  onUnmounted(() => {
    off(eventKey)
  })
  return {
    ready,
  }
}
