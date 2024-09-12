import { useLogger } from 'reactive-vscode'
import { env, Uri } from 'vscode'
import * as Meta from './meta'

/**
 * Logger
 */
export const logger = useLogger(Meta.displayName)

/**
 * Open external URL
 */
export function openExternalURL(url: string) {
  const uri = Uri.parse(url)
  env.openExternal(uri)
}
