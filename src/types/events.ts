import type { Hotspot } from '@/lib/Hotspot/KrpanoHotspot'

export type KrpEventCallback = (cb: (hospot: Hotspot) => {}) => void
