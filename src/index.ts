import { defineExtension } from 'reactive-vscode'
import { version } from '../package.json'
import { useCommands } from './commands'
import { useCodeLenses } from './providers/codelenses'
import { useCompletions } from './providers/completions'
import { useHovers } from './providers/hovers'
import { logger } from './utils'

const { activate, deactivate } = defineExtension(() => {
  logger.info(`✅ Activated, v${version}`)

  // Keep register command at the top
  useCommands()

  useHovers()
  useCodeLenses()
  useCompletions()
})

export { activate, deactivate }
