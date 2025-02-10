/**
 * git
 */

import { unindent as $ } from '@ntnyq/utils'

export const gitIgnoreTemplate = $`
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

export const gitAttributesTemplate = $`
  * text eol=lf
  *.txt text eol=crlf
  *.png binary
  *.jpg binary
  *.jpeg binary
  *.gif binary
  *.ico binary
  *.tff binary
  *.woff binary
  *.woff2 binary
`

export const gitBlameIgnoreRevsTemplate = $`
  # git-blame ignored revisions
  # To configure, run
  #   git config blame.ignoreRevsFile .git-blame-ignore-revs
  # Requires Git > 2.23
  # See https://git-scm.com/docs/git-blame#Documentation/git-blame.txt---ignore-revs-fileltfilegt
`
