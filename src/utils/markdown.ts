import { ALERT_DEFAULT_MARKER } from '../constants/alert'
import { WHITESPACE } from '../constants/common'
import type {
  CreateMarkdownAlertOptions,
  CreateSummaryDetailOptions,
  CreateTableOptions,
} from '../types/markdown'

/**
 * Resolved markdown alert options used by alert builders.
 *
 * Excludes content and syntax because they are handled separately
 * before rendering the final markdown output.
 */
type ResolvedOptions = Omit<CreateMarkdownAlertOptions, 'content' | 'syntax'>

/**
 * Creates a blockquote-style alert block.
 *
 * @param lines - Content lines for the alert.
 * @param options - Resolved alert options.
 * @returns A markdown blockquote alert string.
 */
function createBlockquoteAlert(
  lines: string[],
  options: ResolvedOptions,
): string {
  return `
> [${options.marker || ALERT_DEFAULT_MARKER}${options.uppercaseType ? options.type.toUpperCase() : options.type}]
${
  lines.length > 0
    ? lines.map(line => `> ${line.trim()}`).join('\n')
    : `> This is an example for ${options.type.toUpperCase()}`
}`.trimStart()
}

/**
 * Creates a container-style alert block.
 *
 * @param lines - Content lines for the alert.
 * @param options - Resolved alert options.
 * @returns A markdown container alert string.
 */
function createContainerAlert(
  lines: string[],
  options: ResolvedOptions,
): string {
  return `
::: ${options.uppercaseType ? options.type.toUpperCase() : options.type}
${
  lines.length > 0
    ? lines.map(line => `${line.trim()}`).join('\n')
    : `This is an example for ${options.type.toUpperCase()}`
}
:::
`.trimStart()
}

/**
 * Creates an alert markdown block based on the selected syntax.
 *
 * @param options - Alert creation options.
 * @returns A markdown alert string.
 */
export function createAlert(options: CreateMarkdownAlertOptions): string {
  const isWhitespace = options.content?.trim()?.length === 0
  const lines = isWhitespace ? [] : options.content?.trim()?.split('\n') || []

  if (options.syntax === 'container') {
    return createContainerAlert(lines, options)
  }

  if (options.syntax === 'blockquote') {
    return createBlockquoteAlert(lines, options)
  }

  return ''
}

const separatorMap = {
  center: ':---:',
  left: ':---',
  right: '---:',
} as const

/**
 * Creates a markdown table template.
 *
 * @param options - Table creation options.
 * @returns A markdown table string or an empty string for invalid sizes.
 */
export function createTable(options: CreateTableOptions): string {
  const { columnCount, rowCount, align = 'center' } = options

  if (columnCount < 1 || rowCount < 1) {
    return ''
  }

  const header = `|${Array.from({ length: columnCount }).fill(WHITESPACE.repeat(5)).join('|')}|`
  const separator = `|${Array.from({ length: columnCount })
    .fill(separatorMap[align as keyof typeof separatorMap])
    .join('|')}|`
  const body = Array.from({ length: rowCount }).fill(header).join('\n')
  return [header, separator, body].join('\n')
}

/**
 * Creates a markdown details/summary block.
 *
 * @param options - Summary/detail content options.
 * @returns A markdown details block.
 */
export function createSummaryDetail(
  options: CreateSummaryDetailOptions = {},
): string {
  const { title = 'This is title', content = 'This is content' } = options
  return `
<details>
<summary>${title}</summary>

<br>

${content}
</details>
  `.trim()
}
