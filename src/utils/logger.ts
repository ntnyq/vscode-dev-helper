/**
 * Logger
 */

import { useLogger } from 'reactive-vscode'
import { displayName } from '../meta'

/**
 * reactive-vscode logger
 */
export const logger = useLogger(displayName)
