import { defineExtension } from 'reactive-vscode'
import { version } from '../package.json'
import { useCompletions } from './providers/completions'
import { logger } from './utils'

const { activate, deactivate } = defineExtension(async () => {
  logger.info(`✅ Activated, v${version}`)

  useCompletions()
})

export { activate, deactivate }
