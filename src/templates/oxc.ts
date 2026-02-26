/**
 * @file oxfmt
 */

import { unindent as $ } from '@ntnyq/utils'

export const oxfmtJsoncTemplate = $`
  {
    "$schema": "./node_modules/oxfmt/configuration_schema.json",
    "arrowParens": "avoid",
    "bracketSameLine": false,
    "bracketSpacing": true,
    "embeddedLanguageFormatting": "auto",
    "endOfLine": "lf",
    "sortImports": {
      "newlinesBetween": false,
    },
    "sortPackageJson": {
      "sortScripts": true,
    },
    "htmlWhitespaceSensitivity": "css",
    "ignorePatterns": [
      "**/node_modules/**",
      "**/dist/**",
      "pnpm-lock.yaml",
      "**/*.min.*",
      "**/tests/fixtures/**",
    ],
    "insertFinalNewline": true,
    "jsxSingleQuote": true,
    "objectWrap": "preserve",
    "overrides": [
      {
        "files": ["**/*.{css,scss}"],
        "options": {
          "singleQuote": false,
        },
      },
      {
        "files": ["**/*.html"],
        "options": {
          "singleAttributePerLine": false,
        },
      },
    ],
    "printWidth": 80,
    "proseWrap": "preserve",
    "quoteProps": "as-needed",
    "semi": false,
    "singleAttributePerLine": true,
    "singleQuote": true,
    "tabWidth": 2,
    "trailingComma": "all",
    "useTabs": false,
    "vueIndentScriptAndStyle": false,
  }
`

export const oxlintJsonTemplate = $`
  {
    "$schema": "./node_modules/oxlint/configuration_schema.json",
    "plugins": [
      "eslint",
      "import",
      "jsdoc",
      "node",
      "promise",
      "oxc",
      "typescript",
      "unicorn",
      "vue"
    ],
    "categories": {
      "correctness": "error",
      "suspicious": "warn",
      "pedantic": "warn",
      "perf": "warn",
      "style": "warn",
      "restriction": "warn"
    },
    "ignorePatterns": [
      "**/dist/**",
      "**/node_modules/**",
      "**/tests/fixtures/**"
    ],
    "rules": {
      "import/no-named-export": "off",
      "import/group-exports": "off",
      "func-style": [
        "warn",
        "declaration",
        { "allowArrowFunctions": true }
      ],
      "no-magic-numbers": [
        "warn",
        {
          "ignore": [0, 1, -1, 2, 10, 100, 1000],
          "ignoreArrayIndexes": true,
          "enforceConst": true,
          "detectObjects": false
        }
      ]
    },
    "overrides": [
      {
        "files": ["scripts/**/*.{js,ts}"],
        "rules": {
          "import/no-nodejs-modules": "off",
          "import/prefer-default-export": "off",
          "import/no-named-export": "off"
        }
      },
      {
        "files": ["**/*.config.ts"],
        "rules": {
          "import/no-default-export": "off"
        }
      },
      {
        "files": ["**/components/**/*.{ts,tsx,vue}"],
        "rules": {
          // loose max lines for components setup blocks
          "max-lines-per-function": [
            "warn",
            { "max": 300, "skipBlankLines": true, "skipComments": true },
          ],
          // FIXME: This does not work unless plugin vue is enabled
          // increase max props for vue components to 5
          // "vue/max-props": ["warn", { "maxProps": 5 }]
        },
      },
      {
        "files": ["*.d.ts"],
        "rules": {
          // to extend existing modules, import/export must not appear in declaration files at top level
          "import/unambiguous": "off",
          // we need \`export {}\` to convert a file to a module
          "unicorn/require-module-specifiers": "off"
        },
      },
      {
        "files": ["*.{spec,test}.{js,ts,tsx}", "*.{spec,test}-d.{ts,tsx}"],
        "plugins": ["vitest"],
        "rules": {
          "id-length": "off",
          "max-classes-per-file": "off",
          "max-lines-per-function": "off",
          "max-lines": "off",
          "max-statements": "off",
          "no-empty-function": "off",
          "no-undefined": "off",
          "import/no-nodejs-modules": "off",
          "typescript/ban-ts-comment": "off",
          "typescript/no-non-null-assertion": "off",
          "typescript/prefer-ts-expect-error": "off",
          "typescript/require-array-sort-compare": "off",
        },
      },
    ],
  }
`
