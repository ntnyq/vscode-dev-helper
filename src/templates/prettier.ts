/**
 * @file prettier
 */

import { unindent as $ } from '@ntnyq/utils'

export const prettierConfigTemplate = $`
  // @ts-check
  
  import { defineConfig } from '@ntnyq/prettier-config'
  
  export default defineConfig({
    overrides: [
      {
        files: ['**/*.html'],
        options: {
          singleAttributePerLine: false,
        },
      },
      {
        files: ['**/*.{css,scss}'],
        options: {
          singleQuote: false,
        },
      },
    ],
  })
`

export const prettierIgnoreTemplate = $`
  node_modules
  *.min.*
  public
  
  dist
  coverage
  
  pnpm-lock.yaml
`
