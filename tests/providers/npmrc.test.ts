import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CompletionItemKind, Position } from 'vscode'
import { commands } from '../../src/meta'
import { NPMRCCodeLensProvider } from '../../src/providers/codelenses/npmrc'
import {
  NPMRCKeyCompletionProvider,
  NPMRCValueCompletionProvider,
} from '../../src/providers/completions/npmrc'
import { createDocument } from '../helpers/vscode'

const { config } = vi.hoisted(() => ({ config: { enableCodeLens: true } }))

vi.mock('vscode', () => import('../helpers/vscode'))
vi.mock('../../src/config', () => ({ config }))
vi.mock('../../src/utils/logger', () => ({ logger: { info: vi.fn() } }))
vi.mock('reactive-vscode', () => ({ useDisposable: (value: unknown) => value }))

beforeEach(() => {
  vi.resetAllMocks()
  config.enableCodeLens = true
})

describe('NPMRCKeyCompletionProvider', () => {
  it('filters keys using only text before the cursor', () => {
    const { document } = createDocument('node-linker=isolated')
    const provider = new NPMRCKeyCompletionProvider()

    expect(
      provider.provideCompletionItems(document, new Position(0, 5)),
    ).toEqual({
      items: [
        {
          kind: CompletionItemKind.Field,
          label: { description: 'Pnpm configuration', label: 'node-linker' },
        },
        {
          kind: CompletionItemKind.Field,
          label: { description: 'Pnpm configuration', label: 'node-version' },
        },
      ],
    })
  })

  it('returns no keys for an unknown prefix', () => {
    const { document } = createDocument('unknown')

    expect(
      new NPMRCKeyCompletionProvider().provideCompletionItems(
        document,
        new Position(0, 7),
      ),
    ).toEqual({ items: [] })
  })
})

describe('NPMRCValueCompletionProvider', () => {
  it.each([
    ['node-linker', ['isolated', 'hoisted', 'pnp']],
    ['auto-install-peers', ['true', 'false']],
    ['link-workspace-packages', ['true', 'false', 'deep']],
    ['save-prefix', ['^', '~', '']],
  ])('provides values for %s', (key, values) => {
    const { document } = createDocument(`${key}=existing-value`)

    expect(
      new NPMRCValueCompletionProvider().provideCompletionItems(
        document,
        new Position(0, key.length + 1),
      ),
    ).toEqual({
      items: values.map(value => ({
        kind: CompletionItemKind.Value,
        label: { description: 'Pnpm configuration', label: value },
      })),
    })
  })

  it('returns no values for an unknown key', () => {
    const { document } = createDocument('unknown=')

    expect(
      new NPMRCValueCompletionProvider().provideCompletionItems(
        document,
        new Position(0, 8),
      ),
    ).toEqual({ items: [] })
  })
})

describe('NPMRCCodeLensProvider', () => {
  it('recognizes exact keys, whitespace, and array settings while ignoring comments', () => {
    const { document } = createDocument(
      [
        'registry=https://registry.npmjs.org/',
        '  hoist-pattern[] = *eslint*',
        '# registry=https://example.com/',
        '; hoist=true',
        'not-registry=true',
        'unknown=true',
        'constructor=true',
        '',
      ].join('\n'),
    )

    expect(new NPMRCCodeLensProvider().provideCodeLenses(document)).toEqual([
      {
        command: {
          arguments: ['https://pnpm.io/npmrc#registry'],
          command: commands.openExternalUrl,
          title: 'view docs',
        },
        range: {
          end: { character: 36, line: 0 },
          start: { character: 0, line: 0 },
        },
      },
      {
        command: {
          arguments: ['https://pnpm.io/npmrc#hoist-pattern'],
          command: commands.openExternalUrl,
          title: 'view docs',
        },
        range: {
          end: { character: 28, line: 1 },
          start: { character: 0, line: 1 },
        },
      },
    ])
  })

  it('does not inspect the document when CodeLens is disabled', () => {
    config.enableCodeLens = false
    const { document, mocks } = createDocument('hoist=true')

    expect(new NPMRCCodeLensProvider().provideCodeLenses(document)).toEqual([])
    expect(mocks.lineAt).not.toHaveBeenCalled()
  })
})
