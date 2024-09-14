import { useActiveTextEditor, useDocumentText } from 'reactive-vscode'
import { CodeLens, EventEmitter, workspace } from 'vscode'
import { config } from '../../config'
import { NPMRC_CODELENS_ITEMS, NPMRC_CODELENS_KEYS } from '../../constants/npmrc'
import { commands } from '../../meta'
import { logger } from '../../utils'
import type {
  CodeLensProvider,
  DocumentSelector,
  Event,
  ProviderResult,
  TextDocument,
} from 'vscode'
import type { NPMRCCodelensKeyUnion } from '../../constants/npmrc'

export class NPMRCCodeLensProvider implements CodeLensProvider {
  static selector: DocumentSelector = {
    pattern: '/**/*.npmrc',
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

  provideCodeLenses(document: TextDocument): ProviderResult<CodeLens[]> {
    if (config.enableCodeLens) {
      this.#codeLens = []

      const editor = useActiveTextEditor()
      const text = useDocumentText(() => editor.value?.document)

      if (!text.value) return

      const regexp = new RegExp(`(?:${NPMRC_CODELENS_KEYS.join('|')})=\\S+`, 'g')
      let match: RegExpExecArray | null

      regexp.lastIndex = 0

      while ((match = regexp.exec(text.value))) {
        const line = document.lineAt(document.positionAt(match.index).line)
        const key = line.text.split('=')[0]

        if (!key) return

        logger.info(`🟩 Created codeLens for: ${key}`)

        const codelensItem = NPMRC_CODELENS_ITEMS[key as NPMRCCodelensKeyUnion]

        if (!codelensItem) return

        const range = line.range
        const codelens = new CodeLens(range, {
          title: 'viewDocs',
          command: commands.codelensAction,
          arguments: [codelensItem.url || ''],
        })

        this.#codeLens.push(codelens)
      }
      return this.#codeLens
    }
  }
}
