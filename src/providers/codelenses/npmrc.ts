import { useDisposable } from 'reactive-vscode'
import { CodeLens, EventEmitter, workspace } from 'vscode'
import { config } from '../../config'
import { NPMRC_CODELENS_ITEMS } from '../../constants/npmrc'
import { commands, scopedConfigs } from '../../meta'
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
  public static selector: DocumentSelector = {
    pattern: '/**/*.npmrc',
    scheme: 'file',
  }

  #onDidChangeCodeLenses = useDisposable(new EventEmitter<void>())

  public constructor() {
    useDisposable(
      workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration(scopedConfigs.scope)) {
          this.#onDidChangeCodeLenses.fire()
        }
      }),
    )
  }

  public onDidChangeCodeLenses: Event<void> = this.#onDidChangeCodeLenses.event

  public provideCodeLenses(document: TextDocument): ProviderResult<CodeLens[]> {
    if (!config.enableCodeLens) {
      return []
    }

    const codeLenses: CodeLens[] = []

    for (let lineIndex = 0; lineIndex < document.lineCount; lineIndex += 1) {
      const line = document.lineAt(lineIndex)
      const match = /^\s*(?<key>[^\s=[\]#;]+)(?:\[\])?\s*=/u.exec(line.text)
      const key = match?.groups?.key

      if (key && Object.hasOwn(NPMRC_CODELENS_ITEMS, key)) {
        const codelensItem = NPMRC_CODELENS_ITEMS[key as NPMRCCodelensKeyUnion]

        logger.info(`🟩 Created codeLens for: ${key}`)

        codeLenses.push(
          new CodeLens(line.range, {
            arguments: [codelensItem.url],
            command: commands.openExternalUrl,
            title: 'view docs',
          }),
        )
      }
    }

    return codeLenses
  }
}
