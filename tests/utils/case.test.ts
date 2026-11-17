import { describe, expect, it } from 'vitest'
import { upperFirst } from '../../src/utils/case'

describe('upperFirst', () => {
  it.each([
    ['', ''],
    ['a', 'A'],
    ['helloWorld', 'HelloWorld'],
    ['WARNING', 'WARNING'],
    ['1hello', '1hello'],
    ['中文', '中文'],
  ])('capitalizes only the first character of %j', (value, expected) => {
    expect(upperFirst(value)).toBe(expected)
  })
})
