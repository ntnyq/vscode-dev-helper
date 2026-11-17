import { beforeEach, describe, expect, it, vi } from 'vitest'
import { sortJson } from '../../src/commands/helper/sortJson'
import { createEditor, window } from '../helpers/vscode'

vi.mock('vscode', () => import('../helpers/vscode'))

beforeEach(() => {
  vi.resetAllMocks()
})

describe('sortJson', () => {
  it('sorts nested JSONC objects while preserving array order and values', async () => {
    const { editor, range, replace } = createEditor(`{
      // Comments and trailing commas are accepted.
      "z": [{ "b": 2, "a": 1 }, null, false],
      "a": { "z": "last", "a": "first", },
    }`)

    await sortJson(editor)

    expect(replace).toHaveBeenCalledExactlyOnceWith(
      range,
      '{\n  "a": {\n    "a": "first",\n    "z": "last"\n  },\n  "z": [\n    {\n      "a": 1,\n      "b": 2\n    },\n    null,\n    false\n  ]\n}',
    )
    expect(window.showErrorMessage).not.toHaveBeenCalled()
  })

  it('accepts a top-level array and sorts its objects', async () => {
    const { editor, range, replace } = createEditor('[{"z": 1, "a": 2}, 3]')

    await sortJson(editor)

    expect(replace).toHaveBeenCalledExactlyOnceWith(
      range,
      '[\n  {\n    "a": 2,\n    "z": 1\n  },\n  3\n]',
    )
  })

  it.each(['{}', '[]'])('preserves an empty %s', async text => {
    const { editor, range, replace } = createEditor(text)

    await sortJson(editor)

    expect(replace).toHaveBeenCalledExactlyOnceWith(range, text)
  })

  it.each(['null', 'true', '42', '"hello"'])(
    'rejects the primitive root %s without editing',
    async text => {
      const { editor, replace } = createEditor(text)

      await sortJson(editor)

      expect(window.showErrorMessage).toHaveBeenCalledExactlyOnceWith(
        'Selected JSON must be an object or array.',
      )
      expect(replace).not.toHaveBeenCalled()
    },
  )

  it('leaves the document untouched when parsing fails', async () => {
    const { editor, replace } = createEditor('{"unfinished":')

    await expect(sortJson(editor)).rejects.toThrow()

    expect(replace).not.toHaveBeenCalled()
  })
})
