/**
 * .gitattributes
 */

import { unindent as $ } from '@ntnyq/utils'

export default $`
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
