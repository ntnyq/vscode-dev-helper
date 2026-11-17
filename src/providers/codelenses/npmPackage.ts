import { interopDefault } from '@ntnyq/utils'
import { useDisposable } from 'reactive-vscode'
import { CodeLens, EventEmitter, Range, workspace } from 'vscode'
import { config } from '../../config'
import { commands, scopedConfigs } from '../../meta'
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

  public async provideCodeLenses(document: TextDocument): Promise<CodeLens[]> {
    if (!config.enableCodeLens) {
      return []
    }

    const text = document.getText()

    if (!text) {
      return []
    }

    const { findNpmPackages } = await interopDefault(
      import('find-npm-packages'),
    )
    const isTypeScript = ['typescript', 'typescriptreact'].includes(
      document.languageId,
    )
    const supportsJsx = ['javascriptreact', 'typescriptreact'].includes(
      document.languageId,
    )

    try {
      const npmPackages = findNpmPackages(text, {
        language: isTypeScript ? 'ts' : 'js',
        plugins: supportsJsx ? ['jsx'] : [],
      })

      return npmPackages.flatMap(npmPackage => {
        if (npmPackage.start === null || npmPackage.end === null) {
          return []
        }

        const startPos = document.positionAt(npmPackage.start)
        const endPos = document.positionAt(npmPackage.end)

        return [
          new CodeLens(new Range(startPos, endPos), {
            arguments: [`https://node-modules.dev/#install=${npmPackage.name}`],
            command: commands.openExternalUrl,
            title: 'node-modules.dev',
          }),
        ]
      })
    } catch (error) {
      // Incomplete source is expected while the user is typing.
      if (error instanceof SyntaxError) {
        return []
      }
      throw error
    }
  }
}
