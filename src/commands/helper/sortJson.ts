import { window } from 'vscode'
import { getWholeDocumentRange } from '../../utils/vscode'
import type { TextEditor } from 'vscode'
import JSONC from 'tiny-jsonc'
import { interopDefault } from '@ntnyq/utils'

export async function sortJson(editor: TextEditor) {
  const { document } = editor
  const text = document.getText()

  const json = JSONC.parse(text)

  if (typeof json !== 'object' || json === null) {
    window.showErrorMessage('Selected JSON must be an object or array.')
    return
  }

  const sortKeys = await interopDefault(import('sort-keys'))

  const sortedJson = sortKeys(json, { deep: true })
  const sortedText = JSON.stringify(sortedJson, null, 2)

  await editor.edit(editBuilder => {
    editBuilder.replace(getWholeDocumentRange(document), sortedText)
  })
}
