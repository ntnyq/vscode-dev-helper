import { env, Uri } from 'vscode'
/**
 * Open external URL
 */
export function openExternalURL(url: string) {
  const uri = Uri.parse(url)
  env.openExternal(uri)
}
