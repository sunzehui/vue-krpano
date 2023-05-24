import { getCurrentInstance } from 'vue'
import { identity, pickBy } from 'lodash-es'
import { Params } from '@/types/tools'

export function getCmpUid() {
  const { proxy: { _uid } } = getCurrentInstance() as any
  return _uid
}

// 过滤掉值为 undefined 的参数

export function filterParams(obj: Params): Params {
  return pickBy(obj, identity)
}
