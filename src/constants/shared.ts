/**
 * @file Shared constants
 */

export const BOOL_COMPLETION_ITEMS = <const>['true', 'false']

export const FEATURE_STATUS_ITEMS = <const>['enable', 'disable']

export type FeatureStatusType = (typeof FEATURE_STATUS_ITEMS)[number]

export const BUILTIN_COMMANDS = Object.freeze({
  OPEN: 'vscode.open',
  RELOAD_WINDOW: 'workbench.action.reloadWindow',
})

export const STATUS_BAR_ITEM_ICONS = Object.freeze({
  spin: '$(loading~spin)',
  watch: '$(eye-watch)',
})
