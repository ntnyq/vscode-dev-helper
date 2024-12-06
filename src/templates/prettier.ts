/**
 * prettier
 */

import { unindent as $ } from '@ntnyq/utils'

export const prettierConfigTemplate = $`
  import { config, defineConfig } from '@ntnyq/prettier-config'
  
  export default defineConfig(config)
`
