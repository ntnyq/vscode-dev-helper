import { useCommand } from 'reactive-vscode'
import { config } from '../../config'
import { commands } from '../../meta'
import { openExternalURL } from '../../utils'

export function useCommands() {
  useCommand(commands.enableCodelens, () => {
    config.$update('enableCodeLens', true)
  })

  useCommand(commands.disableCodelens, () => {
    config.$update('enableCodeLens', false)
  })

  useCommand(commands.codelensAction, (url: string) => {
    if (!url.length) return
    openExternalURL(url)
  })
}
