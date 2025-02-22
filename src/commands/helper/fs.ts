import { window } from 'vscode'
import { generateFileInWorkspace } from '../../utils'

export async function createFileInWorkspace(filePath: string, content = '') {
  await generateFileInWorkspace(filePath, `${content}\n`)
  return window.showInformationMessage(`File ${filePath} generated`)
}
