import { interopDefault } from '@ntnyq/utils'
import { createTSBlankSpace } from 'ts-blank-space-lite'
import { getWholeDocumentRange } from '../../utils/vscode'
import type { TextEditor } from 'vscode'

async function stripeTypesByTSBlankSpace(code: string) {
  // TODO: prefer built-in typescript
  const tsLib = await interopDefault(import('typescript'))
  const { tsBlankSpace } = await createTSBlankSpace(tsLib)
  return tsBlankSpace(code)
}

export async function stripeTypes(editor: TextEditor) {
  const { document, selection } = editor
  const range = selection.isEmpty ? getWholeDocumentRange(document) : selection
  const tsCode = document.getText(range)

  const jsCode = await stripeTypesByTSBlankSpace(tsCode)

  await editor.edit(editBuilder => {
    editBuilder.replace(range, jsCode)
  })
}
