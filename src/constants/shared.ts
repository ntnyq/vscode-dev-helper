/**
 * @file Shared constants
 */

export const BOOL_COMPLETION_ITEMS = ['true', 'false'] as const

export const FEATURE_STATUS_ITEMS = ['enable', 'disable'] as const

export type FeatureStatusType = (typeof FEATURE_STATUS_ITEMS)[number]

/**
 * vscode built-in commands
 */
export const BUILTIN_COMMANDS = Object.freeze({
  formatDocument: 'editor.action.formatDocument',
  open: 'vscode.open',
  reloadWindow: 'workbench.action.reloadWindow',
})

export const ICONS = Object.freeze({
  spin: '$(loading~spin)',
  watch: '$(eye-watch)',
})
