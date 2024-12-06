/**
 * Markdown alert preset
 */
export interface MarkdownAlertPreset {
  /**
   * Preset name, 'custom' for use custom preset
   */
  name: 'custom' | 'github' | 'obsidian' | 'vitepress'
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
  'marker' | 'syntax' | 'uppercaseType'
> & {
  /**
   * Alert content
   */
  content?: string
  /**
   * Alert type
   */
  type: string
}

/**
 * Options for `createTable`
 */
export interface CreateTableOptions {
  columnCount: number
  rowCount: number
  /**
   * @default `center`
   */
  align?: 'center' | 'left' | 'right'
}
