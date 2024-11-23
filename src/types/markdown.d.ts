/**
 * Markdown alert preset
 */
export interface MarkdownAlertPreset {
  /**
   * Preset name, 'custom' for use custom preset
   */
  name: 'github' | 'obsidian' | 'vitepress' | 'custom'
  /**
   * Supported alert types
   */
  types: string[]
  /**
   * required if `syntax` is `blockquote`
   *
   * @default '!'
   */
  marker?: string
  /**
   * @default 'blockquote'
   */
  syntax?: 'blockquote' | 'container'
  /**
   * @default false
   */
  uppercaseType?: boolean
}

/**
 * Options for `createMarkdownAlert`
 */
export type CreateMarkdownAlertOptions = Pick<
  MarkdownAlertPreset,
  'syntax' | 'marker' | 'uppercaseType'
> & {
  /**
   * Alert type
   */
  type: string
  /**
   * Alert content
   */
  content?: string
}
