import { Uri, env } from 'vscode'
import { Logger } from './logger'

export class Utils {
  public static Logger = Logger

  public static openExternalURL(url: string) {
    const uri = Uri.parse(url)
    env.openExternal(uri)
  }
}
