/**
 * .gitignore
 */

import { unindent as $ } from '@ntnyq/utils'

export default $`
  .DS_Store
  node_modules
  
  *.log*
  *.local
  *.vsix
  
  .eslintcache
  
  *.tsbuildinfo
  
  **/.vitepress/cache
  **/.vitepress/temp
  
  **/dist
  **/coverage
`
