import { upperFirst } from '@ntnyq/utils'
import { computed, useActiveTextEditor, useCommand, useTextEditorSelection } from 'reactive-vscode'
import { SnippetString, window } from 'vscode'
import { config } from '../config'
import {
  ALERT_DEFAULT_SYNTAX,
  ALERT_DEFAULT_UPPERCASE_TYPE,
  ALERT_PRESET_CUSTOM,
  markdownAlertPresets,
} from '../constants/alert'
import { BUILTIN_COMMANDS } from '../constants/shared'
import { commands } from '../meta'
import { logger, openExternalURL } from '../utils'
import { createAlert, createTable } from '../utils/markdown'
import { executeCommand } from '../utils/vscode'
import { generateNodeVersion } from './generator/nodeVersion'
import { stripeTypes } from './helper/stripeTypes'

export function useCommands() {
  const activeTextEditor = useActiveTextEditor()
  const selection = useTextEditorSelection(activeTextEditor)
  const language = computed(() => activeTextEditor.value?.document.languageId)

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

  useCommand(commands.stripeTypes, async () => {
    if (!activeTextEditor.value) return

    logger.info('🟩 Stripe types')

    await stripeTypes(activeTextEditor.value)
    await executeCommand(BUILTIN_COMMANDS.formatDocument)

    return window.showInformationMessage('Types striped')
  })

  useCommand(commands.generateNodeVersion, async () => {
    await generateNodeVersion()
    return window.showInformationMessage('File .node-version Generated')
  })

  useCommand(commands.insertInlineCode, async () => {
    if (!activeTextEditor.value) return

    logger.info('🟩 Insert Inline Code')

    const content = activeTextEditor.value.document.getText(selection.value)

    if (!content.length) return

    activeTextEditor.value.edit(editBuilder => {
      editBuilder.replace(selection.value, `\\\`${content}\\\``)
    })
  })

  useCommand(commands.createAlert, async () => {
    if (!activeTextEditor.value) return

    if (!language.value || !['markdown', 'mdx'].includes(language.value)) {
      return window.showWarningMessage('Only markdown and mdx is supported')
    }

    const useCustomPreset = config.alertPreset === ALERT_PRESET_CUSTOM

    const alertPreset = markdownAlertPresets.find(preset => preset.name === config.alertPreset)

    const alertTypes = useCustomPreset ? config.alertTypes : alertPreset?.types

    if (!alertTypes?.length) {
      if (useCustomPreset) {
        window.showWarningMessage('Please add alert types in settings')
      }
      return
    }

    const type = await window.showQuickPick(alertTypes.map(upperFirst), {
      canPickMany: false,
      title: 'Select alert type',
      placeHolder: 'Select alert type',
    })

    if (!type) return

    const content = activeTextEditor.value.document.getText(selection.value)

    const alertText = createAlert({
      type,
      content,
      marker: config.alertMarker,
      syntax: (useCustomPreset ? config.alertSyntax : alertPreset?.syntax) || ALERT_DEFAULT_SYNTAX,
      uppercaseType:
        (useCustomPreset ? config.alertUppercaseType : alertPreset?.uppercaseType) ||
        ALERT_DEFAULT_UPPERCASE_TYPE,
    })

    await activeTextEditor.value.insertSnippet(new SnippetString(alertText))

    return window.showInformationMessage(`${type.toUpperCase()} Created`)
  })

  useCommand(commands.createTable, async () => {
    if (!activeTextEditor.value) return

    if (!language.value || !['markdown', 'mdx'].includes(language.value)) {
      return window.showWarningMessage('Only markdown and mdx is supported')
    }

    const input = await window.showInputBox({
      title: 'Create Table',
      prompt: 'Input table size, e.g. 4x3',
      value: '4x3',
      validateInput(size) {
        if (!size) return 'Please input table size'
        if (!/\d+x\d+/.test(size)) return 'Please use format like [4x3]'
        const [rowCount, columnCount] = size.split('x').map(Number)
        if (rowCount <= 0 || columnCount <= 0) return 'Please use format like [4x3]'
        return null
      },
    })
    const trimedInput = input?.trim()

    if (!trimedInput) return

    const [rowCount, columnCount] = trimedInput.split('x').map(v => Number.parseInt(v, 10))

    const alertText = createTable({
      rowCount,
      columnCount,
    })

    await activeTextEditor.value.insertSnippet(new SnippetString(alertText))

    await executeCommand(BUILTIN_COMMANDS.formatDocument)

    return window.showInformationMessage(`Table ${rowCount}x${columnCount} Created`)
  })
}
