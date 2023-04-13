import { ExtensionRegistry } from './registry'
import { Utils } from './utils'
import type { ExtensionContext } from 'vscode'

export async function activate(context: ExtensionContext) {
  Utils.Logger.success('activated')

  // --- COMMAND START ---
  ExtensionRegistry.registerUiCommand(context)
  ExtensionRegistry.registerConfigureCommand(context)
  // --- COMMAND END ---

  // --- PROVIDER START ---
  ExtensionRegistry.registerHoverProviders(context)
  ExtensionRegistry.registerCodelensProviders(context)
  ExtensionRegistry.registerCompletionProviders(context)
  ExtensionRegistry.registerDefinitionProviders(context)
  // --- PROVIDER END ---
}

export async function deactivate() {
  Utils.Logger.success('deactivated')
}
