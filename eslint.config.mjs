// @ts-check

import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  ignores: ['**/src/meta.ts'],
  pnpm: true,
  test: false,
})
