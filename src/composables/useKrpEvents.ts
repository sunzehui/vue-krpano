import mitt from 'mitt'

type Events = {
  initd: any
  unload: any
  [prop: string]: any
}

const emitter = mitt<Events>()
function useKrpEvents() {
  return {
    emit: emitter.emit,
    on: emitter.on,
    off: emitter.off,
  }
}

export {
  useKrpEvents,
}
