/**
 * Create markdown alert
 */

import { ALERT_DEFAULT_MARKER } from '../constants/alert'
import type { CreateMarkdownAlertOptions } from '../types/markdown'

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
