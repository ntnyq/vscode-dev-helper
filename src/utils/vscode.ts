/**
 * Vscode utils
 */

import { Buffer } from 'node:buffer'
import {
  env,
  Range,
  Uri,
  commands as vscodeCommands,
  window,
  workspace,
  WorkspaceEdit,
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
 * Creates a file without overwriting existing content.
 *
 * @param filepath - Relative file path from workspace root.
 * @param content - File content to write.
 * @param folderUri - Target folder, or a workspace folder selected by the user.
 * @returns Whether the file was created.
 */
export async function generateFileInWorkspace(
  filepath: string,
  content = '',
  folderUri?: Uri,
): Promise<boolean> {
  let targetFolder = folderUri

  if (!targetFolder) {
    const folders = workspace.workspaceFolders

    if (!folders?.length) {
      await window.showWarningMessage(
        'Open a workspace folder to generate files',
      )
      return false
    }

    if (folders.length === 1) {
      targetFolder = folders[0].uri
    } else {
      const selectedFolder = await window.showWorkspaceFolderPick({
        placeHolder: `Select a folder for ${filepath}`,
      })
      targetFolder = selectedFolder?.uri
    }
  }

  if (!targetFolder) {
    return false
  }

  const fileUri = Uri.joinPath(targetFolder, filepath)
  const edit = new WorkspaceEdit()

  edit.createFile(fileUri, {
    contents: Buffer.from(content),
    ignoreIfExists: false,
    overwrite: false,
  })

  if (!(await workspace.applyEdit(edit))) {
    await window.showErrorMessage(
      `Could not create ${filepath}. The file may already exist or the folder may not be writable.`,
    )
    return false
  }

  return true
}
