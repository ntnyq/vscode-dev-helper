import { useCommand } from 'reactive-vscode'
import { config } from '../../config'
import * as Meta from '../../meta'
import { openExternalURL } from '../../utils'

export function useCommands() {
  useCommand(Meta.commands.enableCodelens, () => {
    config.$update('enableCodeLens', true)
  })

  useCommand(Meta.commands.disableCodelens, () => {
    config.$update('enableCodeLens', false)
  })

  useCommand(Meta.commands.codelensAction, (url: string) => {
    if (!url.length) return
    openExternalURL(url)
  })
}
