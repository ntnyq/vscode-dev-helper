/**
 * vscode utils
 */

import { env, Range, Uri, commands as vscodeCommands } from 'vscode'
import type { TextDocument } from 'vscode'

/**
 * Open external URL
 */
export function openExternalURL(url: string) {
  const uri = Uri.parse(url)
  env.openExternal(uri)
}

/**
 * execute a command
 */
export async function executeCommand(command: string, ...args: any[]) {
  await vscodeCommands.executeCommand(command, ...args)
}

/**
 * get the range of the whole document
 */
export function getWholeDocumentRange(document: TextDocument): Range {
  const oneLineMoreRange = new Range(0, 0, document.lineCount, 0)
  return document.validateRange(oneLineMoreRange)
}
