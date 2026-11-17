import { Buffer } from 'node:buffer'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Uri } from 'vscode'
import {
  generateFileInWorkspace,
  getWholeDocumentRange,
} from '../../src/utils/vscode'
import { createDocument, window, workspace } from '../helpers/vscode'

vi.mock('vscode', () => import('../helpers/vscode'))

beforeEach(() => {
  vi.resetAllMocks()
  workspace.workspaceFolders = []
  workspace.applyEdit.mockResolvedValue(true)
})

describe('getWholeDocumentRange', () => {
  it('uses the validated document end instead of an out-of-bounds line', () => {
    const { document, mocks, range } = createDocument('first\nlast')

    expect(getWholeDocumentRange(document)).toBe(range)
    expect(mocks.validateRange).toHaveBeenCalledWith({
      end: { character: 0, line: 2 },
      start: { character: 0, line: 0 },
    })
  })
})

describe('generateFileInWorkspace', () => {
  it('creates UTF-8 contents in the explicit folder without overwriting', async () => {
    const folder = Uri.file('/workspace/explicit')

    await expect(
      generateFileInWorkspace('nested/example.txt', '你好', folder),
    ).resolves.toBe(true)

    const [[edit]] = workspace.applyEdit.mock.calls
    expect(edit.createFile).toHaveBeenCalledExactlyOnceWith(
      Uri.file('/workspace/explicit/nested/example.txt'),
      {
        contents: Buffer.from('你好'),
        ignoreIfExists: false,
        overwrite: false,
      },
    )
    expect(window.showWorkspaceFolderPick).not.toHaveBeenCalled()
  })

  it('uses the single workspace folder and defaults to empty contents', async () => {
    workspace.workspaceFolders = [{ uri: Uri.file('/workspace/project') }]

    await expect(generateFileInWorkspace('.node-version')).resolves.toBe(true)

    const [[edit]] = workspace.applyEdit.mock.calls
    expect(edit.createFile).toHaveBeenCalledWith(
      Uri.file('/workspace/project/.node-version'),
      expect.objectContaining({ contents: Buffer.from('') }),
    )
    expect(window.showWorkspaceFolderPick).not.toHaveBeenCalled()
  })

  it.each(['missing', 'empty'])(
    'warns when the workspace is %s',
    async state => {
      if (state === 'missing') {
        Reflect.deleteProperty(workspace, 'workspaceFolders')
      }

      await expect(generateFileInWorkspace('package.json')).resolves.toBe(false)

      expect(window.showWarningMessage).toHaveBeenCalledWith(
        'Open a workspace folder to generate files',
      )
      expect(workspace.applyEdit).not.toHaveBeenCalled()
    },
  )

  it('lets the user choose among multiple workspace folders', async () => {
    const first = { uri: Uri.file('/workspace/first') }
    const second = { uri: Uri.file('/workspace/second') }
    workspace.workspaceFolders = [first, second]
    window.showWorkspaceFolderPick.mockResolvedValue(second)

    await expect(generateFileInWorkspace('package.json')).resolves.toBe(true)

    expect(window.showWorkspaceFolderPick).toHaveBeenCalledWith({
      placeHolder: 'Select a folder for package.json',
    })
    const [[edit]] = workspace.applyEdit.mock.calls
    expect(edit.createFile).toHaveBeenCalledWith(
      Uri.file('/workspace/second/package.json'),
      expect.any(Object),
    )
  })

  it('does not create a file when the folder picker is cancelled', async () => {
    workspace.workspaceFolders = [
      { uri: Uri.file('/workspace/first') },
      { uri: Uri.file('/workspace/second') },
    ]

    await expect(generateFileInWorkspace('package.json')).resolves.toBe(false)

    expect(workspace.applyEdit).not.toHaveBeenCalled()
  })

  it('reports a failed workspace edit', async () => {
    workspace.applyEdit.mockResolvedValue(false)

    await expect(
      generateFileInWorkspace('package.json', '{}', Uri.file('/workspace')),
    ).resolves.toBe(false)

    expect(window.showErrorMessage).toHaveBeenCalledWith(
      expect.stringContaining('Could not create package.json'),
    )
  })

  it('propagates an unexpected workspace error to the command', async () => {
    const error = new Error('permission denied')
    workspace.applyEdit.mockRejectedValue(error)

    await expect(
      generateFileInWorkspace('package.json', '{}', Uri.file('/workspace')),
    ).rejects.toBe(error)
  })
})
