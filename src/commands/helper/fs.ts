import { FileType, Uri, window, workspace } from 'vscode'
import { generateFileInWorkspace } from '../../utils'

export async function createFileInWorkspace(
  filePath: string,
  content = '',
  folderUri?: Uri,
): Promise<void> {
  try {
    const isCreated = await generateFileInWorkspace(
      filePath,
      `${content}\n`,
      folderUri,
    )

    if (isCreated) {
      await window.showInformationMessage(`File ${filePath} generated`)
    }
  } catch (error) {
    await window.showErrorMessage(`Could not create ${filePath}: ${error}`)
  }
}

/**
 * Moves the selected folder's children to the Trash after confirmation.
 *
 * @param folderUri - Folder explicitly selected in Explorer.
 */
export async function emptyFolder(folderUri?: Uri): Promise<void> {
  if (!(folderUri instanceof Uri)) {
    await window.showWarningMessage(
      'Right-click a folder in Explorer to empty it',
    )
    return
  }

  const folderLabel =
    folderUri.scheme === 'file' ? folderUri.fsPath : folderUri.toString(true)

  try {
    const stat = await workspace.fs.stat(folderUri)

    // Reject directory symlinks so their targets are never emptied implicitly.
    if (stat.type !== FileType.Directory) {
      await window.showWarningMessage(
        'Select a folder that is not a symbolic link',
      )
      return
    }

    const entries = await workspace.fs.readDirectory(folderUri)

    if (entries.length === 0) {
      await window.showInformationMessage(
        `Folder "${folderLabel}" is already empty`,
      )
      return
    }

    const confirmLabel = 'Empty Folder'
    const confirmation = await window.showWarningMessage(
      `Empty folder "${folderLabel}"?`,
      {
        detail: `All ${entries.length} items in this folder, including hidden files and subfolders, will be moved to the Trash. The folder itself will be kept.`,
        modal: true,
      },
      confirmLabel,
    )

    if (confirmation !== confirmLabel) {
      return
    }

    // The target may have changed while the confirmation dialog was open.
    const currentStat = await workspace.fs.stat(folderUri)

    if (currentStat.type !== FileType.Directory) {
      await window.showWarningMessage(
        'The selected folder has changed. Try again.',
      )
      return
    }

    for (const [name] of entries) {
      // eslint-disable-next-line no-await-in-loop -- Stop as soon as moving an item fails.
      await workspace.fs.delete(Uri.joinPath(folderUri, name), {
        recursive: true,
        useTrash: true,
      })
    }

    await window.showInformationMessage(`Folder "${folderLabel}" emptied`)
  } catch (error) {
    await window.showErrorMessage(
      `Could not finish emptying folder "${folderLabel}": ${error}. Some items may remain in the folder.`,
    )
  }
}
