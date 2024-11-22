import { computed, useActiveTextEditor, useCommand } from 'reactive-vscode'
import { SnippetString, window } from 'vscode'
import { config } from '../../config'
import { commands } from '../../meta'
import { openExternalURL } from '../../utils'
import { createGitHubAlert } from '../../utils/markdown'

export function useCommands() {
  const activeTextEditor = useActiveTextEditor()
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

  useCommand(commands.createGithubAlert, async () => {
    if (!language.value || !['markdown', 'mdx'].includes(language.value)) {
      return window.showWarningMessage('Only markdown is supported')
    }

    const choice = await window.showQuickPick(['Note', 'Tip', 'Important', 'Warning', 'Caution'], {
      canPickMany: false,
      title: 'Select github alert type',
      placeHolder: 'Select github alert type',
    })

    if (!choice) {
      return window.showWarningMessage('Canceled')
    }

    const alertText = createGitHubAlert(choice)

    await activeTextEditor.value?.insertSnippet(new SnippetString(alertText))

    return window.showInformationMessage('Created')
  })
}
