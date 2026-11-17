import { Buffer } from 'node:buffer'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Uri } from 'vscode'
import {
  createFileInWorkspace,
  emptyFolder,
} from '../../src/commands/helper/fs'
import { FileType, window, workspace } from '../helpers/vscode'

vi.mock('vscode', () => import('../helpers/vscode'))
vi.mock('../../src/utils/logger', () => ({ logger: { info: vi.fn() } }))

beforeEach(() => {
  vi.resetAllMocks()
  workspace.workspaceFolders = []
  workspace.applyEdit.mockResolvedValue(true)
  workspace.fs.stat.mockResolvedValue({ type: FileType.Directory })
  workspace.fs.readDirectory.mockResolvedValue([
    ['.hidden', FileType.File],
    ['nested', FileType.Directory],
  ])
})

describe('createFileInWorkspace', () => {
  it('appends a newline and reports success after creating the file', async () => {
    await createFileInWorkspace(
      '.node-version',
      'lts-latest',
      Uri.file('/workspace'),
    )

    const [[edit]] = workspace.applyEdit.mock.calls
    expect(edit.createFile).toHaveBeenCalledWith(
      Uri.file('/workspace/.node-version'),
      expect.objectContaining({ contents: Buffer.from('lts-latest\n') }),
    )
    expect(window.showInformationMessage).toHaveBeenCalledWith(
      'File .node-version generated',
    )
  })

  it('does not announce success when the edit fails', async () => {
    workspace.applyEdit.mockResolvedValue(false)

    await createFileInWorkspace('package.json', '{}', Uri.file('/workspace'))

    expect(window.showInformationMessage).not.toHaveBeenCalled()
    expect(window.showErrorMessage).toHaveBeenCalledOnce()
  })

  it('reports errors thrown by file creation', async () => {
    workspace.applyEdit.mockRejectedValue(new Error('permission denied'))

    await createFileInWorkspace('package.json', '{}', Uri.file('/workspace'))

    expect(window.showErrorMessage).toHaveBeenCalledWith(
      'Could not create package.json: Error: permission denied',
    )
    expect(window.showInformationMessage).not.toHaveBeenCalled()
  })
})

describe('emptyFolder', () => {
  it('requires an explicit Explorer folder', async () => {
    await emptyFolder()

    expect(window.showWarningMessage).toHaveBeenCalledWith(
      'Right-click a folder in Explorer to empty it',
    )
    expect(workspace.fs.stat).not.toHaveBeenCalled()
    expect(workspace.fs.delete).not.toHaveBeenCalled()
  })

  it.each([
    FileType.File,
    FileType.Unknown,
    FileType.SymbolicLink,
    // oxlint-disable-next-line no-bitwise -- VS Code combines these file type flags.
    FileType.Directory | FileType.SymbolicLink,
  ])('rejects files and symbolic links with type %s', async type => {
    workspace.fs.stat.mockResolvedValue({ type })

    await emptyFolder(Uri.file('/workspace/folder'))

    expect(window.showWarningMessage).toHaveBeenCalledWith(
      'Select a folder that is not a symbolic link',
    )
    expect(workspace.fs.readDirectory).not.toHaveBeenCalled()
    expect(workspace.fs.delete).not.toHaveBeenCalled()
  })

  it('reports an empty folder without asking for confirmation', async () => {
    workspace.fs.readDirectory.mockResolvedValue([])

    await emptyFolder(Uri.file('/workspace/folder'))

    expect(window.showInformationMessage).toHaveBeenCalledWith(
      'Folder "/workspace/folder" is already empty',
    )
    expect(window.showWarningMessage).not.toHaveBeenCalled()
    expect(workspace.fs.delete).not.toHaveBeenCalled()
  })

  it('does not delete anything when confirmation is dismissed', async () => {
    await emptyFolder(Uri.file('/workspace/folder'))

    expect(window.showWarningMessage).toHaveBeenCalledWith(
      'Empty folder "/workspace/folder"?',
      {
        detail:
          'All 2 items in this folder, including hidden files and subfolders, will be moved to the Trash. The folder itself will be kept.',
        modal: true,
      },
      'Empty Folder',
    )
    expect(workspace.fs.stat).toHaveBeenCalledOnce()
    expect(workspace.fs.delete).not.toHaveBeenCalled()
  })

  it('moves hidden files and subfolders to the Trash while retaining the folder', async () => {
    const folder = Uri.file('/workspace/folder')
    window.showWarningMessage.mockResolvedValue('Empty Folder')

    await emptyFolder(folder)

    expect(workspace.fs.stat).toHaveBeenCalledTimes(2)
    expect(workspace.fs.delete.mock.calls).toEqual([
      [Uri.joinPath(folder, '.hidden'), { recursive: true, useTrash: true }],
      [Uri.joinPath(folder, 'nested'), { recursive: true, useTrash: true }],
    ])
    expect(window.showInformationMessage).toHaveBeenCalledWith(
      'Folder "/workspace/folder" emptied',
    )
  })

  it('rechecks the folder after confirmation and rejects a changed target', async () => {
    workspace.fs.stat
      .mockResolvedValueOnce({ type: FileType.Directory })
      .mockResolvedValueOnce({
        // oxlint-disable-next-line no-bitwise -- Simulate a folder becoming a symlink.
        type: FileType.Directory | FileType.SymbolicLink,
      })
    window.showWarningMessage.mockResolvedValue('Empty Folder')

    await emptyFolder(Uri.file('/workspace/folder'))

    expect(window.showWarningMessage).toHaveBeenLastCalledWith(
      'The selected folder has changed. Try again.',
    )
    expect(workspace.fs.delete).not.toHaveBeenCalled()
  })

  it('stops at the first deletion failure and reports partial completion', async () => {
    workspace.fs.readDirectory.mockResolvedValue([
      ['first', FileType.File],
      ['second', FileType.File],
      ['third', FileType.File],
    ])
    window.showWarningMessage.mockResolvedValue('Empty Folder')
    workspace.fs.delete
      .mockResolvedValueOnce(null)
      .mockRejectedValueOnce(new Error('permission denied'))

    await emptyFolder(Uri.file('/workspace/folder'))

    expect(workspace.fs.delete).toHaveBeenCalledTimes(2)
    expect(window.showErrorMessage).toHaveBeenCalledWith(
      'Could not finish emptying folder "/workspace/folder": Error: permission denied. Some items may remain in the folder.',
    )
    expect(window.showInformationMessage).not.toHaveBeenCalled()
  })

  it.each(['stat', 'readDirectory'] as const)(
    'reports a %s failure without deleting anything',
    async operation => {
      workspace.fs[operation].mockRejectedValue(new Error('unavailable'))

      await emptyFolder(Uri.file('/workspace/folder'))

      expect(window.showErrorMessage).toHaveBeenCalledWith(
        expect.stringContaining('Error: unavailable'),
      )
      expect(workspace.fs.delete).not.toHaveBeenCalled()
    },
  )
})
