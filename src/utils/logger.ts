import { window } from 'vscode'
import { Constants } from '../constants'
import type { OutputChannel } from 'vscode'

export interface LoggerOptions {
  prompt?: boolean
  intend?: number
}

export class Logger {
  static #channel: OutputChannel

  public static get outputChannel(): OutputChannel {
    if (!this.#channel) {
      this.#channel = window.createOutputChannel(Constants.ExtensionOutputChannel)
    }
    return this.#channel
  }

  public static raw(...inputs: any[]) {
    this.outputChannel.appendLine(inputs.map(i => i.toString()).join(' '))
  }

  public static info(message: string, { intend = 0 }: LoggerOptions = {}) {
    this.outputChannel.appendLine(`${'\t'.repeat(intend)}${message}`)
  }

  public static success(message: string, { prompt = false, intend = 0 }: LoggerOptions = {}) {
    if (prompt) {
      window.showInformationMessage(message)
    }
    this.info(`✅ SUCCESS: ${message}`, { intend })
  }

  public static warning(message: string, { prompt = false, intend = 0 }: LoggerOptions = {}) {
    if (prompt) {
      window.showWarningMessage(message)
    }
    this.info(`🚫 WARNING: ${message}`, { intend })
  }

  public static async error(
    err: Error | string | any = {},
    { prompt = true, intend = 0 }: LoggerOptions = {},
  ) {
    if (typeof err !== 'string') {
      this.info(`🐛 ERROR: ${err.name}: ${err.message}\n${err.stack}`, { intend })
    }
    if (prompt) {
      const openOutputButton = 'Error Log'
      const message =
        typeof err === 'string'
          ? err
          : `${Constants.ExtensionOutputChannel} Error: ${err.toString()}`
      const result = await window.showErrorMessage(message, openOutputButton)
      if (result !== openOutputButton) return
      this.show()
    }
  }

  public static divider() {
    this.outputChannel.appendLine('\n-----------\n')
  }

  public static show() {
    this.outputChannel.show()
  }

  public static hide() {
    this.outputChannel.hide()
  }

  public static dispose() {
    this.outputChannel.dispose()
  }
}
