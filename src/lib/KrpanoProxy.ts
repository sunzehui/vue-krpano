import { forEach as _forEach } from 'lodash-es'
import { Events } from './Events'
import type { Params } from '@/types/tools'
import { filterParams } from '@/utils/tools'
import type { KrpInstance } from '@/types/krpano'

type FuncName = 'set' | 'loadxml' | 'loadscene' | 'addhotspot' | 'removehotspot' | 'nexttick'

/**
 * 执行单个函数
 * @param func 函数名
 * @param params 参数列表
 */
export const buildKrpanoAction = (func: FuncName, ...params: Array<string | number | boolean>): string =>
  `${func}(${params.map(p => `${p}`).join(', ')});`

export class KrpanoProxy {
  private krpanoInstance: KrpInstance
  private eventsHandler: Events
  constructor(krpanoInstance: KrpInstance) {
    this.krpanoInstance = krpanoInstance
    this.eventsHandler = new Events()
  }

  call(action: string) {
    this.krpanoInstance.call(action)
  }

  get(name: string): any {
    return this.krpanoInstance.get(name)
  }

  set(attrs: Params | string, value?: any): void {
    switch (typeof attrs) {
      case 'string':
        this.call(buildKrpanoAction('set', attrs, value))
        break
      case 'object': {
        const params = filterParams(attrs)
        _forEach(params, (value: any, key: string) => {
          this.call(buildKrpanoAction('set', key, value))
        })
        break
      }
    }
  }

  on(event: string, callback: Function): void {
    this.eventsHandler.on(event, callback)
  }

  off(event: string, callback: Function): void {
    this.eventsHandler.off(event, callback)
  }

  emit(event: string, ...args: any[]): void {
    this.eventsHandler.emit(event, ...args)
  }
}

