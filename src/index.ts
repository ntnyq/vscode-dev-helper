import { defineExtension } from 'reactive-vscode'
import { logger } from './utils'
import { useCompletions } from './providers/completions'

const { activate, deactivate } = defineExtension(async () => {
  logger.info('activated')

  useCompletions()
})

export { activate, deactivate }
