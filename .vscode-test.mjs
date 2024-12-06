import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from '@vscode/test-cli'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  files: ['./dist/tests/**/*.test.js'],
  version: 'insiders',
  extensionDevelopmentPath: __dirname,
  workspaceFolder: `${__dirname}/test-workspace`,
  mocha: {
    color: true,
    timeout: 10_000,
  },
})
