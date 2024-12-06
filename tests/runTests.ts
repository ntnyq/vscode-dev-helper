/**
 * @see {@link https://github.com/microsoft/vscode-test}
 */

import { resolve } from 'node:path'
import process from 'node:process'
import { runTests } from '@vscode/test-electron'

async function go() {
  const projectPath = resolve(__dirname, '../../')
  const extensionDevelopmentPath = projectPath
  const extensionTestsPath = resolve(projectPath, './dist/tests')
  const testWorkspace = resolve(projectPath, './test-workspace')

  try {
    await runTests({
      version: 'insiders',
      extensionDevelopmentPath,
      extensionTestsPath,
      launchArgs: [
        testWorkspace,
        // This disables all extensions except the one being tested
        '--disable-extensions',
      ],
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

go()
