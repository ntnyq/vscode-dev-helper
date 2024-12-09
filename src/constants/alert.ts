import type { MarkdownAlertPreset } from '../types/markdown'

export const ALERT_PRESET_CUSTOM = 'custom'
export const ALERT_DEFAULT_MARKER = '!'
export const ALERT_DEFAULT_SYNTAX = 'container'
export const ALERT_DEFAULT_UPPERCASE_TYPE = false

/**
 * Built-in Presets
 */
export const markdownAlertPresets: MarkdownAlertPreset[] = [
  /**
   * @see https://github.com/orgs/community/discussions/16925
   */
  {
    marker: '!',
    name: 'github',
    syntax: 'blockquote',
    types: ['note', 'tip', 'important', 'warning', 'caution'],
    uppercaseType: true,
  },
  /**
   * @see https://vitepress.dev/guide/markdown#custom-containers
   */
  {
    name: 'vitepress',
    syntax: 'container',
    types: ['info', 'tip', 'warning', 'danger', 'detail'],
    uppercaseType: false,
  },
  /**
   * @see https://help.obsidian.md/Editing+and+formatting/Callouts
   */
  {
    marker: '!',
    name: 'obsidian',
    syntax: 'blockquote',
    uppercaseType: false,
    types: [
      'note',
      'abstract',
      'summary',
      'tldr',
      'info',
      'todo',
      'tip',
      'hint',
      'important',
      'success',
      'check',
      'done',
      'question',
      'help',
      'faq',
      'warning',
      'caution',
      'attention',
      'failure',
      'fail',
      'missing',
      'danger',
      'error',
      'bug',
      'example',
      'quote',
      'cite',
    ],
  },
]
