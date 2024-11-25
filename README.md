# vscode-dev-helper

> A VSCode extension for a bunch of misc things.

[![Version](https://img.shields.io/visual-studio-marketplace/v/ntnyq.vscode-dev-helper)](https://marketplace.visualstudio.com/items/ntnyq.vscode-dev-helper)
[![CI](https://github.com/ntnyq/vscode-dev-helper/workflows/CI/badge.svg)](https://github.com/ntnyq/vscode-dev-helper/actions)
[![LICENSE](https://img.shields.io/github/license/ntnyq/vscode-dev-helper.svg)](https://github.com/ntnyq/vscode-dev-helper/blob/main/LICENSE)

## Features

- pnpm config jsonschema in `package.json`
- `.npmrc` completion, codelenses
- generate `.node-version` file
- create Alert in markdown, default [GitHub](https://github.com/orgs/community/discussions/16925) style

## Commands

<!-- commands -->

| Command                                   | Title                                      |
| ----------------------------------------- | ------------------------------------------ |
| `vscode-dev-helper.enable-codelens`       | VSCode Dev Helper: Enable CodeLens         |
| `vscode-dev-helper.disable-codelens`      | VSCode Dev Helper: Disable CodeLens        |
| `vscode-dev-helper.codelens-action`       | VSCode Dev Helper: Trigger CodeLens Action |
| `vscode-dev-helper.create-alert`          | VSCode Dev Helper: Create Alert            |
| `vscode-dev-helper.generate-node-version` | VSCode Dev Helper: Generate .node-version  |
| `vscode-dev-helper.insert-inline-code`    | VSCode Dev Helper: Insert Inline Code      |

<!-- commands -->

## Configs

<!-- configs -->

| Key                                    | Description                         | Type      | Default                                       |
| -------------------------------------- | ----------------------------------- | --------- | --------------------------------------------- |
| `vscode-dev-helper.enableCodeLens`     | Enable CodeLens                     | `boolean` | `true`                                        |
| `vscode-dev-helper.alertPreset`        | Preset of Alert                     | `string`  | `"github"`                                    |
| `vscode-dev-helper.alertTypes`         | Types for Custom Alert              | `array`   | `["info","tip","success","warning","danger"]` |
| `vscode-dev-helper.alertMarker`        | Marker for Custom Alert             | `string`  | `"!"`                                         |
| `vscode-dev-helper.alertSyntax`        | Markdown Syntax for Custom Alert    | `string`  | `"container"`                                 |
| `vscode-dev-helper.alertUppercaseType` | Use Uppercase Type for Custom Alert | `boolean` | `false`                                       |
| `vscode-dev-helper.nodeVersion`        | Default version for .node-version   | `string`  | `"lts-latest"`                                |

<!-- configs -->

## License

[MIT](./LICENSE) License © 2023-PRESENT [ntnyq](https://github.com/ntnyq)
