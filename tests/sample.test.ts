import { strictEqual } from 'node:assert'
import { describe, it } from 'node:test'
import * as vscode from 'vscode'

describe('sample test', () => {
  it('should pass', () => {
    vscode.window.showInformationMessage('Hello World from sample.test.ts!')
    strictEqual(2, 1 + 1)
  })
})
