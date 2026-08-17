import { interopDefault } from '@ntnyq/utils'
import { computed, useActiveTextEditor, useDocumentText } from 'reactive-vscode'
import { CodeLens, EventEmitter, Range, workspace } from 'vscode'
import { config } from '../../config'
import { commands } from '../../meta'
import type {
  CodeLensProvider,
  DocumentSelector,
  Event,
  TextDocument,
} from 'vscode'

export class NpmPackageCodeLensProvider implements CodeLensProvider {
  public static selector: DocumentSelector = {
    pattern: '/**/*.{js,ts,jsx,tsx}',
    scheme: 'file',
  }

  #codeLens: CodeLens[] = []
  #_onDidChangeCodeLenses: EventEmitter<void> = new EventEmitter<void>()

  public constructor() {
    workspace.onDidChangeConfiguration(() => {
      this.#_onDidChangeCodeLenses.fire()
    })
  }

  public onDidChangeCodeLenses: Event<void> = this.#_onDidChangeCodeLenses.event

  public async provideCodeLenses(
    document: TextDocument,
  ): Promise<CodeLens[] | undefined> {
    if (config.enableCodeLens) {
      this.#codeLens = []

      const editor = useActiveTextEditor(),
        text = useDocumentText(() => editor.value?.document),
        languageId = computed(() => editor.value?.document.languageId)

      if (!text.value) {
        return
      }
      if (!languageId.value) {
        return
      }

      const { findNpmPackages } = await interopDefault(
          import('find-npm-packages'),
        ),
        language = ['javascriptreact', 'typescriptreact'].includes(
          languageId.value,
        )
          ? 'jsx'
          : 'ts',
        npmPackages = findNpmPackages(text.value, {
          cache: true,
          language,
        })

      npmPackages.forEach(npmPackage => {
        const startPos = document.positionAt(npmPackage.start!),
          endPos = document.positionAt(npmPackage.end!),
          codelens = new CodeLens(new Range(startPos, endPos), {
            arguments: [`https://node-modules.dev/#install=${npmPackage.name}`],
            command: commands.openExternalUrl,
            title: 'node-modules.dev',
          })

        this.#codeLens.push(codelens)
      })

      return this.#codeLens
    }
  }
}
