/**
 * Vscode utils
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
 * Opens a URL using the system external handler.
 *
 * @param url - The URL to open.
 */
export function openExternalURL(url: string): void {
  const uri = Uri.parse(url)
  env.openExternal(uri)
}

/**
 * Executes a VS Code command with optional arguments.
 *
 * @param command - The command identifier.
 * @param args - Arguments passed to the command.
 */
export async function executeCommand(
  command: string,
  ...args: unknown[]
): Promise<void> {
  await vscodeCommands.executeCommand(command, ...args)
}

/**
 * Returns the validated range that covers the whole document.
 *
 * @param document - The target text document.
 * @returns A range from document start to the line after the last line.
 */
export function getWholeDocumentRange(document: TextDocument): Range {
  const oneLineMoreRange = new Range(0, 0, document.lineCount, 0)
  return document.validateRange(oneLineMoreRange)
}

/**
 * Writes a file into the first workspace folder.
 *
 * @param filepath - Relative file path from workspace root.
 * @param content - File content to write.
 */
export async function generateFileInWorkspace(
  filepath: string,
  content = '',
): Promise<void> {
  const workspaceFolders = useWorkspaceFolders()

  if (!workspaceFolders.value?.length) {
    return
  }

  const rootPath = workspaceFolders.value[0].uri.fsPath
  const path = Uri.file(`${rootPath}/${filepath}`)

  try {
    await workspace.fs.writeFile(path, Buffer.from(content))
  } catch (error) {
    window.showErrorMessage(`File ${filepath} created failed: ${error}`)
  }
}
