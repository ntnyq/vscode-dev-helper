import { useActiveTextEditor, useDocumentText } from 'reactive-vscode'
import { EventEmitter, workspace } from 'vscode'
import type {
  CodeLens,
  CodeLensProvider,
  DocumentSelector,
  Event,
  ProviderResult,
  TextDocument,
} from 'vscode'

export class PackageJsonCodeLensProvider implements CodeLensProvider {
  static selector: DocumentSelector = {
    pattern: '/**/package.json',
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
    const editor = useActiveTextEditor()
    const text = useDocumentText(() => editor.value?.document)

    if (!text.value) return

    console.log({ document })

    return this.#codeLens
  }
}
