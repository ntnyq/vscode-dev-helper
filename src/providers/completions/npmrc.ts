import { CompletionItem, CompletionItemKind, CompletionList } from 'vscode'
import { NPMRC_COMPLETION_ITEMS, NPMRC_COMPLETION_KEYS } from '../../constants/npmrc'
import type {
  CompletionItemProvider,
  DocumentSelector,
  Position,
  ProviderResult,
  TextDocument,
} from 'vscode'
import type { NPMRCCompletionKeyUnion } from '../../constants/npmrc'

export class NPMRCKeyCompletionProvider implements CompletionItemProvider {
  public static selector: DocumentSelector = {
    pattern: '/**/.npmrc',
    scheme: 'file',
  }

  public static trigger = '*'

  public provideCompletionItems(
    document: TextDocument,
    position: Position,
  ): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
    const line = document.lineAt(position)
    const lineText = `${line.text.slice(0, Math.max(0, position.character))}`

    const comletionList = NPMRC_COMPLETION_KEYS.filter(key => key.startsWith(lineText)).map(
      item =>
        new CompletionItem(
          { label: item, description: 'Pnpm configuration' },
          CompletionItemKind.Field,
        ),
    )

    return new CompletionList(comletionList)
  }
}

export class NPMRCValueCompletionProvider implements CompletionItemProvider {
  public static selector: DocumentSelector = {
    pattern: '/**/.npmrc',
    scheme: 'file',
  }

  public static trigger = '='

  public provideCompletionItems(
    document: TextDocument,
    position: Position,
  ): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
    const line = document.lineAt(position)
    const lineText = `${line.text.slice(0, Math.max(0, position.character))}`
    const comletionValueList =
      NPMRC_COMPLETION_ITEMS[lineText.replace('=', '') as NPMRCCompletionKeyUnion] ?? []

    const comletionList = comletionValueList.map(
      item =>
        new CompletionItem(
          { label: item, description: 'Pnpm configuration' },
          CompletionItemKind.Value,
        ),
    )

    return new CompletionList(comletionList)
  }
}
