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
  static selector: DocumentSelector = {
    pattern: '/**/*.{js,ts,jsx,tsx}',
    scheme: 'file',
  }

  #codeLens: CodeLens[] = []
  #_onDidChangeCodeLenses: EventEmitter<void> = new EventEmitter<void>()

  constructor() {
    workspace.onDidChangeConfiguration(() => {
      this.#_onDidChangeCodeLenses.fire()
    })
  }

  onDidChangeCodeLenses: Event<void> = this.#_onDidChangeCodeLenses.event

  async provideCodeLenses(
    document: TextDocument,
  ): Promise<CodeLens[] | undefined> {
    if (config.enableCodeLens) {
      this.#codeLens = []

      const editor = useActiveTextEditor()
      const text = useDocumentText(() => editor.value?.document)
      const languageId = computed(() => editor.value?.document.languageId)

      if (!text.value || !languageId.value) {
        return
      }

      const { findNpmPackages } = await interopDefault(
        import('find-npm-packages'),
      )
      const language = ['javascriptreact', 'typescriptreact'].includes(
        languageId.value,
      )
        ? 'jsx'
        : 'ts'
      const npmPackages = findNpmPackages(text.value!, {
        cache: true,
        language,
      })

      npmPackages.forEach(npmPackage => {
        const startPos = document.positionAt(npmPackage.start!)
        const endPos = document.positionAt(npmPackage.end!)

        const codelens = new CodeLens(new Range(startPos, endPos), {
          title: 'node-modules.dev',
          command: commands.openExternalUrl,
          arguments: [`https://node-modules.dev/#install=${npmPackage.name}`],
        })

        this.#codeLens.push(codelens)
      })

      return this.#codeLens
    }
  }
}
