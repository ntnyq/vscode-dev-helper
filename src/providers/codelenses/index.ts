import { extensionContext } from 'reactive-vscode'
import { languages } from 'vscode'
import { NPMRCCodeLensProvider } from './npmrc'
import { PackageJsonCodeLensProvider } from './packageJson'

export function useCodeLenses() {
  const ctx = extensionContext.value!

  ctx.subscriptions.push(
    languages.registerCodeLensProvider(NPMRCCodeLensProvider.selector, new NPMRCCodeLensProvider()),
    languages.registerCodeLensProvider(
      PackageJsonCodeLensProvider.selector,
      new PackageJsonCodeLensProvider(),
    ),
  )
}
