/**
 * @file Extension Registry
 */

import { languages } from 'vscode'
import {
  NpmRcKeyCompletionProvider,
  NpmRcValueCompletionProvider,
} from './providers/completions/npmrc'
import type { ExtensionContext } from 'vscode'

export class ExtensionRegistry {
  public static registerUiCommand(context: ExtensionContext) {
    context.subscriptions.push()
  }

  public static registerConfigureCommand(context: ExtensionContext) {
    context.subscriptions.push()
  }

  public static registerHoverProviders(context: ExtensionContext) {
    context.subscriptions.push()
  }

  public static registerCompletionProviders(context: ExtensionContext) {
    context.subscriptions.push(
      languages.registerCompletionItemProvider(
        NpmRcKeyCompletionProvider.selector,
        new NpmRcKeyCompletionProvider(),
        NpmRcKeyCompletionProvider.trigger,
      ),
      languages.registerCompletionItemProvider(
        NpmRcValueCompletionProvider.selector,
        new NpmRcValueCompletionProvider(),
        NpmRcValueCompletionProvider.trigger,
      ),
    )
  }

  public static registerCodelensProviders(context: ExtensionContext) {
    context.subscriptions.push()
  }

  public static registerDefinitionProviders(context: ExtensionContext) {
    context.subscriptions.push()
  }
}
