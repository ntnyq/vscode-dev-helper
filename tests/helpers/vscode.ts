// oxlint-disable max-classes-per-file -- Small substitutes for VS Code value objects.
import path from 'node:path'
import { vi } from 'vitest'
import type { Command, TextDocument, TextEditor } from 'vscode'

// Only the VS Code API surfaces exercised by these unit tests are implemented.
export class Position {
  public line: number
  public character: number

  public constructor(line: number, character: number) {
    this.line = line
    this.character = character
  }
}

export class Range {
  public start: Position
  public end: Position

  public constructor(
    ...coordinates: [Position, Position] | [number, number, number, number]
  ) {
    const [start, end, endLine = 0, endCharacter = 0] = coordinates
    this.start =
      start instanceof Position ? start : new Position(start, Number(end))
    this.end =
      end instanceof Position ? end : new Position(endLine, endCharacter)
  }
}

export class Uri {
  public fsPath: string
  public scheme = 'file'

  public constructor(fsPath: string) {
    this.fsPath = fsPath
  }

  public static file(filepath: string) {
    return new Uri(filepath)
  }

  public static joinPath(base: Uri, ...paths: string[]) {
    return new Uri(path.posix.join(base.fsPath, ...paths))
  }
}

export class WorkspaceEdit {
  public createFile = vi.fn()
}

export const FileType = {
  Directory: 2,
  File: 1,
  SymbolicLink: 64,
  Unknown: 0,
} as const

export const window = {
  showErrorMessage: vi.fn(),
  showInformationMessage: vi.fn(),
  showWarningMessage: vi.fn(),
  showWorkspaceFolderPick: vi.fn(),
}

export const workspace = {
  applyEdit: vi.fn(),
  fs: {
    delete: vi.fn(),
    readDirectory: vi.fn(),
    stat: vi.fn(),
  },
  onDidChangeConfiguration: vi.fn(),
  workspaceFolders: [] as { uri: Uri }[],
}

export const env = { openExternal: vi.fn() }
export const commands = { executeCommand: vi.fn() }

export class CodeLens {
  public range: Range
  public command?: Command

  public constructor(range: Range, command?: Command) {
    this.range = range
    this.command = command
  }
}

export class EventEmitter {
  public event = vi.fn()
  public fire = vi.fn()
}

export const CompletionItemKind = { Field: 4, Value: 11 } as const

export class CompletionItem {
  public label: { description: string; label: string }
  public kind: number

  public constructor(
    label: { description: string; label: string },
    kind: number,
  ) {
    this.label = label
    this.kind = kind
  }
}

export class CompletionList {
  public items: CompletionItem[]

  public constructor(items: CompletionItem[]) {
    this.items = items
  }
}

/**
 * Supplies the document methods used by the extension without an Extension Host.
 *
 * @param text - Document contents.
 * @param languageId - Document language or extension.
 * @returns A partial document and its observable methods.
 */
export function createDocument(text: string, languageId = 'json') {
  const lines = text.split('\n')
  const lastLineIndex = lines.length - 1
  const range = new Range(0, 0, lastLineIndex, lines[lastLineIndex].length)
  const document = {
    fileName: `/workspace/example.${languageId}`,
    getText: vi.fn(() => text),
    languageId,
    lineAt: vi.fn((position: number | Position) => {
      const line = typeof position === 'number' ? position : position.line
      return {
        range: new Range(line, 0, line, lines[line].length),
        text: lines[line],
      }
    }),
    lineCount: lines.length,
    positionAt: vi.fn((offset: number) => {
      const prefix = text.slice(0, offset).split('\n')
      return new Position(prefix.length - 1, prefix.at(-1)!.length)
    }),
    validateRange: vi.fn(() => range),
  }

  // The partial document deliberately implements only the methods under test.
  return {
    document: document as unknown as TextDocument,
    mocks: document,
    range,
  }
}

/**
 * Records document replacements without writing to a real editor.
 *
 * @param text - Initial document contents.
 * @param languageId - Document language or extension.
 * @returns A partial editor and its recorded replacements.
 */
export function createEditor(text: string, languageId = 'json') {
  const { document, mocks, range } = createDocument(text, languageId)
  const replace = vi.fn()
  const selection = { end: range.end, isEmpty: true, start: range.start }
  const editor = {
    document,
    // oxlint-disable-next-line promise/prefer-await-to-callbacks -- VS Code's edit API takes a callback.
    edit: vi.fn((callback: (builder: { replace: typeof replace }) => void) => {
      // oxlint-disable-next-line promise/prefer-await-to-callbacks -- Invoke the edit builder synchronously as VS Code does.
      callback({ replace })
      return Promise.resolve(true)
    }),
    selection,
  }

  return {
    editor: editor as unknown as TextEditor,
    mocks,
    range,
    replace,
    selection,
  }
}
