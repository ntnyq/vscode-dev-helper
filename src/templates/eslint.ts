/**
 * eslint
 */

import { unindent as $ } from '@ntnyq/utils'

export const eslintConfigTemplate = $`
  import { defineESLintConfig } from '@ntnyq/eslint-config'
  
  export default defineESLintConfig()
`
