import { upperFirst } from '@ntnyq/utils'
import {
  computed,
  useActiveTextEditor,
  useCommand,
  useTextEditorSelection,
} from 'reactive-vscode'
import { SnippetString, window } from 'vscode'
import { config } from '../config'
import {
  ALERT_DEFAULT_SYNTAX,
  ALERT_DEFAULT_UPPERCASE_TYPE,
  ALERT_PRESET_CUSTOM,
  markdownAlertPresets,
} from '../constants/alert'
import { LANGUAGES_MARKDOWN } from '../constants/language'
import { BUILTIN_COMMANDS } from '../constants/shared'
import { commands } from '../meta'
import {
  eslintConfigTemplate,
  gitAttributesTemplate,
  gitBlameIgnoreRevsTemplate,
  gitIgnoreTemplate,
  prettierConfigTemplate,
  prettierIgnoreTemplate,
} from '../templates'
import { packageJsonTemplate } from '../templates/packageJson'
import { logger, openExternalURL } from '../utils'
import {
  createAlert,
  createSummaryDetail,
  createTable,
} from '../utils/markdown'
import { executeCommand } from '../utils/vscode'
import { createFileInWorkspace } from './helper/fs'

export async function useCommands() {
  const editor = useActiveTextEditor()
  const selection = useTextEditorSelection(editor)
  const languageId = computed(() => editor.value?.document.languageId)

  useCommand(commands.enableCodelens, () => {
    config.$update('enableCodeLens', true)
  })

  useCommand(commands.disableCodelens, () => {
    config.$update('enableCodeLens', false)
  })

  useCommand(commands.openExternalUrl, (url: string) => {
    if (!url.length) return
    openExternalURL(url)
  })

  useCommand(commands.stripeTypes, async () => {
    if (!editor.value) return

    logger.info('🟩 Stripe types')

    const { stripeTypes } = await import('./helper/stripeTypes')

    await stripeTypes(editor.value)
    await executeCommand(BUILTIN_COMMANDS.formatDocument)

    return window.showInformationMessage('Types striped')
  })

  useCommand(commands.generateNodeVersion, () => {
    createFileInWorkspace('.node-version', config.nodeVersion)
  })

  useCommand(commands.generateGitattributes, () => {
    createFileInWorkspace('.gitattributes', gitAttributesTemplate)
  })

  useCommand(commands.generateGitignore, () => {
    createFileInWorkspace('.gitignore', gitIgnoreTemplate)
  })

  useCommand(commands.generateGitBlameIgnoreRevs, () => {
    createFileInWorkspace('.git-blame-ignore-revs', gitBlameIgnoreRevsTemplate)
  })

  useCommand(commands.generateEslintConfig, () => {
    createFileInWorkspace('eslint.config.mjs', eslintConfigTemplate)
  })

  useCommand(commands.generatePrettierConfig, async () => {
    createFileInWorkspace('prettier.config.mjs', prettierConfigTemplate)
  })

  useCommand(commands.generatePrettierIgnore, () => {
    createFileInWorkspace('.prettierignore', prettierIgnoreTemplate)
  })

  useCommand(commands.generatePackageJson, () => {
    createFileInWorkspace('package.json', packageJsonTemplate)
  })

  useCommand(commands.insertInlineCode, async () => {
    if (!editor.value) return

    logger.info('🟩 Insert Inline Code')

    const content = editor.value.document.getText(selection.value)

    if (!content.length) return

    editor.value.edit(editBuilder => {
      editBuilder.replace(selection.value, `\\\`${content}\\\``)
    })
  })

  useCommand(commands.createAlert, async () => {
    if (!editor.value) return

    if (!languageId.value || !LANGUAGES_MARKDOWN.includes(languageId.value)) {
      return window.showWarningMessage('Only markdown and mdx is supported')
    }

    const useCustomPreset = config.alertPreset === ALERT_PRESET_CUSTOM

    const alertPreset = markdownAlertPresets.find(
      preset => preset.name === config.alertPreset,
    )

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

    const content = editor.value.document.getText(selection.value)

    const alertText = createAlert({
      type,
      content,
      marker: config.alertMarker,
      syntax:
        (useCustomPreset ? config.alertSyntax : alertPreset?.syntax)
        || ALERT_DEFAULT_SYNTAX,
      uppercaseType:
        (useCustomPreset
          ? config.alertUppercaseType
          : alertPreset?.uppercaseType) || ALERT_DEFAULT_UPPERCASE_TYPE,
    })

    await editor.value.insertSnippet(new SnippetString(alertText))

    return window.showInformationMessage(`${type.toUpperCase()} Created`)
  })

  useCommand(commands.createTable, async () => {
    if (!editor.value) return

    if (!languageId.value || !LANGUAGES_MARKDOWN.includes(languageId.value)) {
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
        if (rowCount <= 0 || columnCount <= 0) {
          return 'Please use format like [4x3]'
        }
        return null
      },
    })
    const trimedInput = input?.trim()

    if (!trimedInput) return

    const [rowCount, columnCount] = trimedInput
      .split('x')
      .map(v => Number.parseInt(v, 10))

    const alertText = createTable({
      rowCount,
      columnCount,
    })

    await editor.value.insertSnippet(new SnippetString(alertText))

    await executeCommand(BUILTIN_COMMANDS.formatDocument)

    return window.showInformationMessage(
      `Table ${rowCount}x${columnCount} Created`,
    )
  })

  useCommand(commands.createSummaryDetail, async () => {
    if (!editor.value) return

    if (!languageId.value || !LANGUAGES_MARKDOWN.includes(languageId.value)) {
      return window.showWarningMessage('Only markdown and mdx is supported')
    }

    const content = createSummaryDetail()

    await editor.value.insertSnippet(new SnippetString(content))

    await executeCommand(BUILTIN_COMMANDS.formatDocument)

    return window.showInformationMessage(`Summary detail Created`)
  })
}
