/**
 * @file Shared constants
 */

export const BOOL_COMPLETION_ITEMS = ['true', 'false'] as const

export const FEATURE_STATUS_ITEMS = ['enable', 'disable'] as const

export type FeatureStatusType = (typeof FEATURE_STATUS_ITEMS)[number]

export const BUILTIN_COMMANDS = Object.freeze({
  OPEN: 'vscode.open',
  RELOAD_WINDOW: 'workbench.action.reloadWindow',
})

export const STATUS_BAR_ITEM_ICONS = Object.freeze({
  spin: '$(loading~spin)',
  watch: '$(eye-watch)',
})
