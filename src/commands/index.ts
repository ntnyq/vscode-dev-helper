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
  oxfmtJsoncTemplate,
  oxlintJsoncTemplate,
  packageJsonTemplate,
  prettierConfigTemplate,
  prettierIgnoreTemplate,
} from '../templates'
import {
  createAlert,
  createInlineCode,
  createSummaryDetail,
  createTable,
  executeCommand,
  logger,
  openExternalURL,
  upperFirst,
} from '../utils'
import { createFileInWorkspace, emptyFolder } from './helper/fs'
import type { Uri } from 'vscode'

const MAX_TABLE_CELL_COUNT = 10_000

export async function useCommands(): Promise<void> {
  const editor = useActiveTextEditor()
  const selection = useTextEditorSelection(editor)
  const languageId = computed(() => editor.value?.document.languageId)

  useCommand(commands.enableCodelens, () => {
    config.update('enableCodeLens', true)
  })

  useCommand(commands.disableCodelens, () => {
    config.update('enableCodeLens', false)
  })

  useCommand(commands.openExternalUrl, (url: string) => {
    if (url.length === 0) {
      return
    }
    openExternalURL(url)
  })

  useCommand(commands.stripeTypes, async () => {
    if (!editor.value) {
      return
    }

    logger.info('🟩 Stripe types')

    const { stripeTypes } = await import('./helper/stripeTypes')

    await stripeTypes(editor.value)
    await executeCommand(BUILTIN_COMMANDS.formatDocument)

    return window.showInformationMessage('Types striped')
  })

  useCommand(commands.sortJson, async () => {
    if (!editor.value) {
      return
    }

    logger.info('🟩 Sort JSON')

    const { sortJson } = await import('./helper/sortJson')

    await sortJson(editor.value)
    await executeCommand(BUILTIN_COMMANDS.formatDocument)

    return window.showInformationMessage('JSON sorted')
  })

  useCommand(commands.generateNodeVersion, (folderUri?: Uri) =>
    createFileInWorkspace('.node-version', config.nodeVersion, folderUri),
  )

  useCommand(commands.emptyFolder, (folderUri?: Uri) => {
    emptyFolder(folderUri)
  })

  const fileCommands = [
    [commands.generateGitattributes, '.gitattributes', gitAttributesTemplate],
    [commands.generateGitignore, '.gitignore', gitIgnoreTemplate],
    [
      commands.generateGitBlameIgnoreRevs,
      '.git-blame-ignore-revs',
      gitBlameIgnoreRevsTemplate,
    ],
    [commands.generateEslintConfig, 'eslint.config.mjs', eslintConfigTemplate],
    [
      commands.generatePrettierConfig,
      'prettier.config.mjs',
      prettierConfigTemplate,
    ],
    [commands.generateOxfmtConfig, '.oxfmtrc.jsonc', oxfmtJsoncTemplate],
    [commands.generateOxlintConfig, '.oxlintrc.jsonc', oxlintJsoncTemplate],
    [
      commands.generatePrettierIgnore,
      '.prettierignore',
      prettierIgnoreTemplate,
    ],
    [commands.generatePackageJson, 'package.json', packageJsonTemplate],
  ] as const

  for (const [command, filePath, content] of fileCommands) {
    useCommand(command, (folderUri?: Uri) =>
      createFileInWorkspace(filePath, content, folderUri),
    )
  }

  useCommand(commands.insertInlineCode, () => {
    if (!editor.value) {
      return
    }

    logger.info('🟩 Insert Inline Code')

    const content = editor.value.document.getText(selection.value)

    if (content.length === 0) {
      return
    }

    editor.value.edit(editBuilder => {
      if (!selection.value) {
        return
      }
      editBuilder.replace(selection.value, createInlineCode(content))
    })
  })

  useCommand(commands.createAlert, async () => {
    const activeEditor = editor.value

    if (!activeEditor) {
      return
    }

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

    const alertSelection = activeEditor.selection
    const content = activeEditor.document.getText(alertSelection)
    const selectedType = await window.showQuickPick(
      alertTypes.map(type => ({ label: upperFirst(type), type })),
      {
        canPickMany: false,
        placeHolder: 'Select alert type',
        title: 'Select alert type',
      },
    )

    if (!selectedType) {
      return
    }

    const { type } = selectedType

    const alertText = createAlert({
      content,
      marker: config.alertMarker,
      syntax:
        (useCustomPreset ? config.alertSyntax : alertPreset?.syntax) ||
        ALERT_DEFAULT_SYNTAX,
      type,
      uppercaseType:
        (useCustomPreset
          ? config.alertUppercaseType
          : alertPreset?.uppercaseType) || ALERT_DEFAULT_UPPERCASE_TYPE,
    })

    const isInserted = await activeEditor.insertSnippet(
      new SnippetString().appendText(alertText),
      alertSelection,
      { keepWhitespace: true, undoStopAfter: true, undoStopBefore: true },
    )

    if (!isInserted) {
      return
    }

    return window.showInformationMessage(`${type.toUpperCase()} Created`)
  })

  useCommand(commands.createTable, async () => {
    if (!editor.value) {
      return
    }

    if (!languageId.value || !LANGUAGES_MARKDOWN.includes(languageId.value)) {
      return window.showWarningMessage('Only markdown and mdx is supported')
    }

    const input = await window.showInputBox({
      prompt: 'Input table size, e.g. 4x3',
      title: 'Create Table',
      validateInput(size) {
        const trimmedSize = size.trim()

        if (!trimmedSize) {
          return 'Please input table size'
        }
        if (!/^\d+x\d+$/u.test(trimmedSize)) {
          return 'Please use format like [4x3]'
        }
        const [rowCount, columnCount] = trimmedSize.split('x').map(Number)
        if (
          !Number.isSafeInteger(rowCount) ||
          !Number.isSafeInteger(columnCount) ||
          rowCount <= 0 ||
          columnCount <= 0
        ) {
          return 'Please use positive safe integers for table dimensions'
        }
        if (rowCount * columnCount > MAX_TABLE_CELL_COUNT) {
          return `Please use at most ${MAX_TABLE_CELL_COUNT} table cells`
        }
        return null
      },
      value: '4x3',
    })
    const trimmedInput = input?.trim()

    if (!trimmedInput) {
      return
    }

    const [rowCount, columnCount] = trimmedInput.split('x').map(Number)

    const alertText = createTable({
      columnCount,
      rowCount,
    })

    await editor.value.insertSnippet(new SnippetString(alertText))

    await executeCommand(BUILTIN_COMMANDS.formatDocument)

    return window.showInformationMessage(
      `Table ${rowCount}x${columnCount} Created`,
    )
  })

  useCommand(commands.createSummaryDetail, async () => {
    if (!editor.value) {
      return
    }

    if (!languageId.value || !LANGUAGES_MARKDOWN.includes(languageId.value)) {
      return window.showWarningMessage('Only markdown and mdx is supported')
    }

    const content = createSummaryDetail()

    await editor.value.insertSnippet(new SnippetString(content))

    await executeCommand(BUILTIN_COMMANDS.formatDocument)

    return window.showInformationMessage(`Summary detail Created`)
  })
}
