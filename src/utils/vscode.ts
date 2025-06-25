/**
 * vscode utils
 */

import { Buffer } from 'node:buffer'
import { useWorkspaceFolders } from 'reactive-vscode'
import {
  env,
  Range,
  Uri,
  commands as vscodeCommands,
  window,
  workspace,
} from 'vscode'
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

export async function generateFileInWorkspace(filepath: string, content = '') {
  const workspaceFolders = useWorkspaceFolders()

  if (!workspaceFolders.value?.length) {
    return
  }

  const rootPath = workspaceFolders.value[0].uri.fsPath
  const path = Uri.file(`${rootPath}/${filepath}`)

  try {
    await workspace.fs.writeFile(path, Buffer.from(content))
  } catch (err) {
    window.showErrorMessage(`File ${filepath} created failed: ${err}`)
  }
}
