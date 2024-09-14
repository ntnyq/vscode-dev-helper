import { defineConfigObject } from 'reactive-vscode'
import { scopedConfigs } from './meta'
import type { ScopedConfigKeyTypeMap } from './meta'

export const config = defineConfigObject<ScopedConfigKeyTypeMap>(
  scopedConfigs.scope,
  scopedConfigs.defaults,
)
