import { extensionContext } from 'reactive-vscode'
import { languages } from 'vscode'
import { NPMRCHoverProvider } from './npmrc'

export function useHovers() {
  const ctx = extensionContext.value!

  ctx.subscriptions.push(
    languages.registerHoverProvider(
      NPMRCHoverProvider.selector,
      new NPMRCHoverProvider(),
    ),
  )
}
