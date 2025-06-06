/**
 * @file eslint
 */

import { unindent as $ } from '@ntnyq/utils'

export const eslintConfigTemplate = $`
  // @ts-check
  
  import { defineESLintConfig } from '@ntnyq/eslint-config'
  
  export default defineESLintConfig()
`
