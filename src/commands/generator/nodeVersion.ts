import { Buffer } from 'node:buffer'
import { useWorkspaceFolders } from 'reactive-vscode'
import { Uri, window, workspace } from 'vscode'
import { config } from '../../config'

export async function generateNodeVersion() {
  const workspaceFolders = useWorkspaceFolders()

  if (!workspaceFolders.value?.length) return

  const rootPath = workspaceFolders.value[0].uri.fsPath
  const filePath = Uri.file(`${rootPath}/.node-version`)

  try {
    await workspace.fs.writeFile(filePath, Buffer.from(config.nodeVersion))
  } catch (err) {
    window.showErrorMessage(`File .node-version created failed: ${err}`)
  }
}
