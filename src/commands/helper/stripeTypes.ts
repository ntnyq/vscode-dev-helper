import { interopDefault } from '@ntnyq/utils'
import { getWholeDocumentRange } from '../../utils/vscode'
import type { TextEditor } from 'vscode'

export async function stripeTypes(editor: TextEditor) {
  const { document, selection } = editor
  const range = selection.isEmpty ? getWholeDocumentRange(document) : selection
  const tsCode = document.getText(range)

  const { transpile } = await interopDefault(import('oxidase'))

  const jsCode = transpile(tsCode)

  await editor.edit(editBuilder => {
    editBuilder.replace(range, jsCode)
  })
}
