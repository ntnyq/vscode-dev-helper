import { extensionContext } from 'reactive-vscode'
import { languages } from 'vscode'
import { NpmPackageCodeLensProvider } from './npmPackage'
import { NPMRCCodeLensProvider } from './npmrc'

export function useCodeLenses() {
  const ctx = extensionContext.value!

  ctx.subscriptions.push(
    languages.registerCodeLensProvider(
      NPMRCCodeLensProvider.selector,
      new NPMRCCodeLensProvider(),
    ),

    languages.registerCodeLensProvider(
      NpmPackageCodeLensProvider.selector,
      new NpmPackageCodeLensProvider(),
    ),
  )
}
