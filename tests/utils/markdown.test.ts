import { describe, expect, it } from 'vitest'
import {
  createAlert,
  createInlineCode,
  createSummaryDetail,
  createTable,
} from '../../src/utils/markdown'

describe('createInlineCode', () => {
  it.each([
    ['hello', '`hello`'],
    ['', '``'],
    ['a`b', '``a`b``'],
    ['a``b`c', '```a``b`c```'],
    ['`hello`', '`` `hello` ``'],
    [' hello ', '`  hello  `'],
    [' hello', '` hello`'],
    ['hello ', '`hello `'],
    ['   ', '`   `'],
  ])('wraps %j without losing its content', (content, expected) => {
    expect(createInlineCode(content)).toBe(expected)
  })
})

describe('createAlert', () => {
  it('creates a GitHub blockquote with every content line quoted', () => {
    expect(
      createAlert({
        content: 'first\r\n\r\nlast',
        syntax: 'blockquote',
        type: 'warning',
        uppercaseType: true,
      }),
    ).toBe('> [!WARNING]\n> first\n> \n> last')
  })

  it('respects a custom marker and preserves type casing by default', () => {
    expect(
      createAlert({
        content: 'content',
        marker: '?',
        syntax: 'blockquote',
        type: 'tip',
      }),
    ).toBe('> [?tip]\n> content')
  })

  it('falls back to the default marker when the marker is empty', () => {
    expect(
      createAlert({
        content: 'content',
        marker: '',
        syntax: 'blockquote',
        type: 'note',
      }),
    ).toBe('> [!note]\n> content')
  })

  it('creates a container and preserves indentation and blank lines', () => {
    expect(
      createAlert({
        content: '  first\n\nlast  ',
        syntax: 'container',
        type: 'tip',
      }),
    ).toBe('::: tip\n  first\n\nlast  \n:::\n')
  })

  it('supports uppercase container types', () => {
    expect(
      createAlert({
        content: 'content',
        syntax: 'container',
        type: 'danger',
        uppercaseType: true,
      }),
    ).toBe('::: DANGER\ncontent\n:::\n')
  })

  it.each([{}, { content: '' }, { content: ' \r\n ' }])(
    'uses placeholder text for empty content %j',
    options => {
      expect(
        createAlert({
          content: options.content,
          syntax: 'blockquote',
          type: 'note',
        }),
      ).toBe('> [!note]\n> This is an example for NOTE')
      expect(
        createAlert({
          content: options.content,
          syntax: 'container',
          type: 'tip',
        }),
      ).toBe('::: tip\nThis is an example for TIP\n:::\n')
    },
  )

  it('returns no output when no syntax is selected', () => {
    expect(createAlert({ type: 'note' })).toBe('')
  })
})

describe('createTable', () => {
  it('creates a header and the requested number of body rows', () => {
    expect(createTable({ columnCount: 2, rowCount: 2 })).toBe(
      '|     |     |\n|:---:|:---:|\n|     |     |\n|     |     |',
    )
  })

  it.each([
    ['left', '|:---|'],
    ['center', '|:---:|'],
    ['right', '|---:|'],
  ] as const)('supports %s alignment', (align, separator) => {
    expect(createTable({ align, columnCount: 1, rowCount: 1 })).toBe(
      `|     |\n${separator}\n|     |`,
    )
  })

  it.each([
    { columnCount: 0, rowCount: 1 },
    { columnCount: 1, rowCount: 0 },
    { columnCount: -1, rowCount: 1 },
    { columnCount: 1, rowCount: -1 },
  ])('rejects invalid dimensions %j', options => {
    expect(createTable(options)).toBe('')
  })
})

describe('createSummaryDetail', () => {
  it('provides a complete default template', () => {
    expect(createSummaryDetail()).toBe(
      '<details>\n<summary>This is title</summary>\n\n<br>\n\nThis is content\n</details>',
    )
  })

  it('preserves custom Markdown content', () => {
    expect(
      createSummaryDetail({ content: '**hello**\n\nworld', title: 'More' }),
    ).toBe(
      '<details>\n<summary>More</summary>\n\n<br>\n\n**hello**\n\nworld\n</details>',
    )
  })

  it('preserves explicitly empty title and content', () => {
    expect(createSummaryDetail({ content: '', title: '' })).toBe(
      '<details>\n<summary></summary>\n\n<br>\n\n\n</details>',
    )
  })
})
