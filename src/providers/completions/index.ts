import { extensionContext } from 'reactive-vscode'
import { languages } from 'vscode'
import {
  NPMRCKeyCompletionProvider,
  NPMRCValueCompletionProvider,
} from './npmrc'

export function useCompletions() {
  const ctx = extensionContext.value!

  ctx.subscriptions.push(
    languages.registerCompletionItemProvider(
      NPMRCKeyCompletionProvider.selector,
      new NPMRCKeyCompletionProvider(),
      NPMRCKeyCompletionProvider.trigger,
    ),

    languages.registerCompletionItemProvider(
      NPMRCValueCompletionProvider.selector,
      new NPMRCValueCompletionProvider(),
      NPMRCValueCompletionProvider.trigger,
    ),
  )
}
