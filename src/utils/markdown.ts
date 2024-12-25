import { ALERT_DEFAULT_MARKER } from '../constants/alert'
import { WHITESPACE } from '../constants/common'
import type {
  CreateMarkdownAlertOptions,
  CreateSummaryDetailOptions,
  CreateTableOptions,
} from '../types/markdown'

type ResolvedOptions = Omit<CreateMarkdownAlertOptions, 'content' | 'syntax'>

function createBlockquoteAlert(lines: string[], options: ResolvedOptions) {
  return `
> [${options.marker || ALERT_DEFAULT_MARKER}${options.uppercaseType ? options.type.toUpperCase() : options.type}]
${
  lines.length > 0
    ? lines.map(line => `> ${line.trim()}`).join('\n') // Keep empty line between
    : `> This is an example for ${options.type.toUpperCase()}`
}`.trimStart()
}

function createContainerAlert(lines: string[], options: ResolvedOptions) {
  return `
::: ${options.uppercaseType ? options.type.toUpperCase() : options.type}
${
  lines.length > 0
    ? lines.map(line => `${line.trim()}`).join('\n') // Keep empty line between
    : `This is an example for ${options.type.toUpperCase()}`
}
:::
`.trimStart()
}

/**
 * create markdown alert
 */
export function createAlert(options: CreateMarkdownAlertOptions) {
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
  left: ':---',
  center: ':---:',
  right: '---:',
} as const

/**
 * create table
 */
export function createTable(options: CreateTableOptions) {
  const { columnCount, rowCount, align = 'center' } = options

  if (columnCount < 1 || rowCount < 1) return ''

  const header = `|${Array.from({ length: columnCount }).fill(WHITESPACE.repeat(5)).join('|')}|`
  const separator = `|${Array.from({ length: columnCount })
    .fill(separatorMap[align as keyof typeof separatorMap])
    .join('|')}|`
  const body = Array.from({ length: rowCount }).fill(header).join('\n')
  return [header, separator, body].join('\n')
}

/**
 * create summary detail
 */
export function createSummaryDetail(options: CreateSummaryDetailOptions = {}) {
  const { title = 'This is title', content = 'This is content' } = options
  return `
<details>
<summary>${title}</summary>

<br>

${content}
</details>
  `.trim()
}
