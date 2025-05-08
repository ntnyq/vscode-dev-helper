# vscode-dev-helper

[![CI](https://github.com/ntnyq/vscode-dev-helper/workflows/CI/badge.svg)](https://github.com/ntnyq/vscode-dev-helper/actions)
[![Version](https://img.shields.io/visual-studio-marketplace/v/ntnyq.vscode-dev-helper)](https://marketplace.visualstudio.com/items/ntnyq.vscode-dev-helper)
[![LICENSE](https://img.shields.io/github/license/ntnyq/vscode-dev-helper.svg)](https://github.com/ntnyq/vscode-dev-helper/blob/main/LICENSE)

> A VSCode extension for a bunch of misc things.

## Features

- JSON Schema support
  - pnpm config in `package.json`
  - [taze](https://github.com/antfu-collective/taze) config `.tazerc.json`
- `.npmrc` completion, codelenses
- npm packages codelenses
- stripe types from ts?(x) files via [oxidase](https://github.com/branchseer/oxidase)
- generate files
  - `.gitattributes`
  - `.gitignore`
  - `.git-blame-ignore-revs`
  - `.node-version`
  - `eslint.config.mjs`
  - `prettier.config.mjs`
  - `.prettierignore`
  - `package.json`
- markdown helpers
  - create alert, default [GitHub](https://github.com/orgs/community/discussions/16925) style
  - create table
  - create summary detail

## Commands

<!-- commands -->

| Command                                            | Title                                              |
| -------------------------------------------------- | -------------------------------------------------- |
| `vscode-dev-helper.enable-codelens`                | VSCode Dev Helper: Enable CodeLens                 |
| `vscode-dev-helper.disable-codelens`               | VSCode Dev Helper: Disable CodeLens                |
| `vscode-dev-helper.open-external-url`              | VSCode Dev Helper: Open External URL               |
| `vscode-dev-helper.create-alert`                   | VSCode Dev Helper: Create Alert                    |
| `vscode-dev-helper.create-table`                   | VSCode Dev Helper: Create Table                    |
| `vscode-dev-helper.create-summary-detail`          | VSCode Dev Helper: Create Summary Detail           |
| `vscode-dev-helper.generate-node-version`          | VSCode Dev Helper: Generate .node-version          |
| `vscode-dev-helper.generate-gitignore`             | VSCode Dev Helper: Generate .gitignore             |
| `vscode-dev-helper.generate-gitattributes`         | VSCode Dev Helper: Generate .gitattributes         |
| `vscode-dev-helper.generate-git-blame-ignore-revs` | VSCode Dev Helper: Generate .git-blame-ignore-revs |
| `vscode-dev-helper.generate-eslint-config`         | VSCode Dev Helper: Generate eslint.config.mjs      |
| `vscode-dev-helper.generate-prettier-config`       | VSCode Dev Helper: Generate prettier.config.mjs    |
| `vscode-dev-helper.generate-prettier-ignore`       | VSCode Dev Helper: Generate .prettierignore        |
| `vscode-dev-helper.generate-package-json`          | VSCode Dev Helper: Generate package.json           |
| `vscode-dev-helper.insert-inline-code`             | VSCode Dev Helper: Insert Inline Code              |
| `vscode-dev-helper.stripe-types`                   | VSCode Dev Helper: Stripe Types                    |

<!-- commands -->

## Configs

<!-- configs -->

| Key                                    | Description                         | Type      | Default                                       |
| -------------------------------------- | ----------------------------------- | --------- | --------------------------------------------- |
| `vscode-dev-helper.alertMarker`        | Marker for Custom Alert             | `string`  | `"!"`                                         |
| `vscode-dev-helper.alertPreset`        | Preset of Alert                     | `string`  | `"github"`                                    |
| `vscode-dev-helper.alertSyntax`        | Markdown Syntax for Custom Alert    | `string`  | `"container"`                                 |
| `vscode-dev-helper.alertTypes`         | Types for Custom Alert              | `array`   | `["danger","info","success","tip","warning"]` |
| `vscode-dev-helper.alertUppercaseType` | Use Uppercase Type for Custom Alert | `boolean` | `false`                                       |
| `vscode-dev-helper.enableCodeLens`     | Enable CodeLens                     | `boolean` | `true`                                        |
| `vscode-dev-helper.nodeVersion`        | Default version for .node-version   | `string`  | `"lts-latest"`                                |

<!-- configs -->

## License

[MIT](./LICENSE) License © 2023-PRESENT [ntnyq](https://github.com/ntnyq)
