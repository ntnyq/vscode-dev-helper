import { interopDefault } from '@ntnyq/utils'
import { getWholeDocumentRange } from '../../utils/vscode'
import type { TextEditor } from 'vscode'

export async function stripeTypes(editor: TextEditor) {
  const { document, selection } = editor,
    range = selection.isEmpty ? getWholeDocumentRange(document) : selection,
    tsCode = document.getText(range),
    { transpile } = await interopDefault(import('oxidase')),
    jsCode = transpile(tsCode)

  await editor.edit(editBuilder => {
    editBuilder.replace(range, jsCode)
  })
}
