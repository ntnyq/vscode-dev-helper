/**
 * package.json
 */

import { unindent as $ } from '@ntnyq/utils'

export const packageJsonTemplate = $`
  {
    "name": "playground",
    "type": "module",
    "version": "0.0.0",
    "private": true,
    "license": "MIT",
    "scripts": {}
  }
`
