// @ts-check

import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  ignores: ['**/src/meta.ts'],
  typescript: {
    overrides: {
      '@typescript-eslint/consistent-generic-constructors': 'off',
    },
  },
})
