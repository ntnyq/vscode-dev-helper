import { defineExtension } from 'reactive-vscode'
import { version } from '../package.json'
import { useCodeLenses } from './providers/codelenses'
import { useCommands } from './providers/commands'
import { useCompletions } from './providers/completions'
import { useHovers } from './providers/hovers'
import { logger } from './utils'

const { activate, deactivate } = defineExtension(async () => {
  logger.info(`✅ Activated, v${version}`)

  // Keep register command at the top
  useCommands()

  useHovers()
  useCompletions()
  useCodeLenses()
})

export { activate, deactivate }
