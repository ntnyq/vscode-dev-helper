import { window } from 'vscode'
import { generateFileInWorkspace } from '../../utils'
import type { Uri } from 'vscode'

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
