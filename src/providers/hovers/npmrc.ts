import { Hover, MarkdownString } from 'vscode'
import { NPMRC_CODELENS_ITEMS, NPMRC_CODELENS_KEYS } from '../../constants/npmrc'
import type {
  DocumentSelector,
  HoverProvider,
  Position,
  ProviderResult,
  TextDocument,
} from 'vscode'
import type { NPMRCCodelensKeyUnion } from '../../constants/npmrc'

export class NPMRCHoverProvider implements HoverProvider {
  static selector: DocumentSelector = {
    pattern: '/**/.npmrc',
    scheme: 'file',
  }

  provideHover(document: TextDocument, position: Position): ProviderResult<Hover> {
    const range = document.getWordRangeAtPosition(position)
    const { text } = document.lineAt(position.line)
    const key = text.split('=')[0]

    if (!key || !NPMRC_CODELENS_KEYS.includes(key)) return

    const content = NPMRC_CODELENS_ITEMS[key as NPMRCCodelensKeyUnion].description
    const markdown = new MarkdownString(content)
    markdown.isTrusted = true
    markdown.supportHtml = true

    return new Hover(markdown, range)
  }
}
