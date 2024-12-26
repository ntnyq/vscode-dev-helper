import { createTSBlankSpace } from 'ts-blank-space-lite'
import { config } from '../../config'
import { getWholeDocumentRange } from '../../utils/vscode'
import type { TextEditor } from 'vscode'

async function stripeTypesByTSBlankSpace(code: string) {
  // TODO: prefer built-in typescript
  const tsLib = await import('typescript')
  const { tsBlankSpace } = await createTSBlankSpace(tsLib)
  return tsBlankSpace(code)
}

async function stripeTypesBySWCWasmTypescript(code: string) {
  const { transform } = await import('@swc/wasm-typescript')
  const result = await transform(code, {
    mode: 'strip-only',
  })
  return result.code
}

const transformers = {
  'ts-blank-space': stripeTypesByTSBlankSpace,
  '@swc/wasm-typescript': stripeTypesBySWCWasmTypescript,
} as const

export async function stripeTypes(editor: TextEditor) {
  const { document, selection } = editor
  const range = selection.isEmpty ? getWholeDocumentRange(document) : selection
  const tsCode = document.getText(range)

  const transform = transformers[config.stripeTypes]
  const jsCode = await transform(tsCode)

  await editor.edit(editBuilder => {
    editBuilder.replace(range, jsCode)
  })
}
