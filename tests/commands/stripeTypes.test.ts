import { describe, expect, it, vi } from 'vitest'
import { stripeTypes } from '../../src/commands/helper/stripeTypes'
import { createEditor } from '../helpers/vscode'

vi.mock('vscode', () => import('../helpers/vscode'))

describe('stripeTypes', () => {
  it('removes TypeScript declarations from the whole document', async () => {
    const { editor, mocks, range, replace } = createEditor(
      'interface User { name: string }\nconst name: string = "Ada";',
      'ts',
    )

    await stripeTypes(editor)

    expect(mocks.getText).toHaveBeenCalledWith(range)
    expect(replace).toHaveBeenCalledOnce()
    const [[replacedRange, code]] = replace.mock.calls
    expect(replacedRange).toBe(range)
    expect(code).toContain('const name')
    expect(code).toContain('"Ada"')
    expect(code).not.toContain('interface User')
    expect(code).not.toContain(': string')
  })

  it('replaces only selected code when the selection is not empty', async () => {
    const { editor, mocks, replace, selection } = createEditor(
      'const before: number = 1;\nconst selected: number = 2;',
      'ts',
    )
    selection.isEmpty = false
    mocks.getText.mockReturnValue('const selected: number = 2;')

    await stripeTypes(editor)

    expect(mocks.getText).toHaveBeenCalledExactlyOnceWith(selection)
    expect(mocks.validateRange).not.toHaveBeenCalled()
    expect(replace).toHaveBeenCalledExactlyOnceWith(
      selection,
      expect.stringContaining('const selected'),
    )
    expect(replace.mock.calls[0][1]).not.toContain(': number')
    expect(replace.mock.calls[0][1]).not.toContain('before')
  })

  it('preserves JSX in a TSX document', async () => {
    const { editor, range, replace } = createEditor(
      'const view: JSX.Element = <div>Hello</div>;',
      'tsx',
    )

    await stripeTypes(editor)

    expect(replace).toHaveBeenCalledExactlyOnceWith(
      range,
      expect.stringContaining('<div>Hello</div>'),
    )
    expect(replace.mock.calls[0][1]).not.toContain(': JSX.Element')
  })
})
