import { upperFirst } from '@ntnyq/utils'
import { computed, useActiveTextEditor, useCommand, useTextEditorSelection } from 'reactive-vscode'
import { SnippetString, window } from 'vscode'
import { config } from '../../config'
import {
  ALERT_DEFAULT_SYNTAX,
  ALERT_DEFAULT_UPPERCASE_TYPE,
  ALERT_PRESET_CUSTOM,
  markdownAlertPresets,
} from '../../constants/alert'
import { commands } from '../../meta'
import { openExternalURL } from '../../utils'
import { createAlert } from '../../utils/markdown'

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
}
