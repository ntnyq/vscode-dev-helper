import { defineConfig } from 'reactive-vscode'
import { scopedConfigs } from './meta'
import type { NestedScopedConfigs } from './meta'

export const config = defineConfig<NestedScopedConfigs>(scopedConfigs.scope)
