import { commands } from 'vscode'
import { Constants } from '../constants'
import type { ICommandRegistry } from '../types'

export class RegisterHelper {
  public static composeCommand(command: string) {
    return `${Constants.ExtensionIdentifier}.${command}`
  }

  public static registerCommand(input: ICommandRegistry) {
    return commands.registerCommand(RegisterHelper.composeCommand(input.command), input.callback)
  }
}
