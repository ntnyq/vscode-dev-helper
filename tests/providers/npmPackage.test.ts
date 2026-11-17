import { beforeEach, describe, expect, it, vi } from 'vitest'
import { commands } from '../../src/meta'
import { NpmPackageCodeLensProvider } from '../../src/providers/codelenses/npmPackage'
import { createDocument } from '../helpers/vscode'

const { config } = vi.hoisted(() => ({ config: { enableCodeLens: true } }))

vi.mock('vscode', () => import('../helpers/vscode'))
vi.mock('../../src/config', () => ({ config }))
vi.mock('reactive-vscode', () => ({ useDisposable: (value: unknown) => value }))

beforeEach(() => {
  vi.resetAllMocks()
  config.enableCodeLens = true
})

describe('NpmPackageCodeLensProvider', () => {
  it('links npm imports while ignoring local and built-in modules', async () => {
    const source = [
      "import { ref } from 'vue'",
      "import { useStorage } from '@vueuse/core'",
      "import './local.js'",
      "import fs from 'node:fs'",
    ].join('\n')
    const { document, mocks } = createDocument(source, 'javascript')

    const lenses = await new NpmPackageCodeLensProvider().provideCodeLenses(
      document,
    )

    expect(lenses.map(lens => lens.command)).toEqual([
      {
        arguments: ['https://node-modules.dev/#install=vue'],
        command: commands.openExternalUrl,
        title: 'node-modules.dev',
      },
      {
        arguments: ['https://node-modules.dev/#install=@vueuse/core'],
        command: commands.openExternalUrl,
        title: 'node-modules.dev',
      },
    ])
    const vueOffset = source.indexOf('vue')
    expect(lenses[0].range).toEqual({
      end: mocks.positionAt(vueOffset + 'vue'.length),
      start: mocks.positionAt(vueOffset),
    })
  })

  it.each([
    ['typescript', "import type { Ref } from 'vue'; const count: number = 1;"],
    ['javascriptreact', "import React from 'react'; const view = <div />;"],
    [
      'typescriptreact',
      "import React from 'react'; const view: JSX.Element = <div />;",
    ],
  ])('supports %s syntax', async (languageId, source) => {
    const { document } = createDocument(source, languageId)

    const lenses = await new NpmPackageCodeLensProvider().provideCodeLenses(
      document,
    )

    expect(lenses).toHaveLength(1)
    expect(lenses[0].command?.command).toBe(commands.openExternalUrl)
  })

  it('returns no lenses while an import is incomplete', async () => {
    const { document } = createDocument("import { ref } from '", 'javascript')

    await expect(
      new NpmPackageCodeLensProvider().provideCodeLenses(document),
    ).resolves.toEqual([])
  })

  it('returns no lenses for an empty document', async () => {
    const { document } = createDocument('', 'javascript')

    await expect(
      new NpmPackageCodeLensProvider().provideCodeLenses(document),
    ).resolves.toEqual([])
  })

  it('does not read the document when CodeLens is disabled', async () => {
    config.enableCodeLens = false
    const { document, mocks } = createDocument("import 'vue'", 'javascript')

    await expect(
      new NpmPackageCodeLensProvider().provideCodeLenses(document),
    ).resolves.toEqual([])
    expect(mocks.getText).not.toHaveBeenCalled()
  })
})
