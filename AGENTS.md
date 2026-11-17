# Repository Guidelines

## Project Structure & Module Organization

This is an ESM TypeScript VS Code extension built with reactive-vscode.

- `src/index.ts` wires extension activation, commands, and providers.
- `src/commands/` contains command registration and helper implementations.
- `src/providers/` groups CodeLens, completion, and hover providers.
- `src/templates/` holds generated-file templates; `src/constants/`, `src/utils/`, and `src/types/` contain shared definitions.
- `tests/` contains Vitest tests grouped by feature, with shared VS Code API mocks and document/editor factories in `tests/helpers/`.
- `schemas/` contains JSON schemas, `res/` holds extension assets, and `playground/` provides a manual testing workspace.
- `dist/` contains build output. `src/meta.ts` is generated metadata.

## Build, Test, and Development Commands

Use the pnpm version declared in `package.json` and Node.js LTS.

- `pnpm install --frozen-lockfile`: install locked dependencies.
- `pnpm dev`: build in watch mode with source maps.
- `pnpm build`: create the production bundle and copy the required oxidase WASM asset.
- `pnpm lint`: run Oxlint.
- `pnpm format`: apply Oxfmt formatting; `pnpm format:check` checks without rewriting.
- `pnpm typecheck`: run strict TypeScript checks with `tsgo`.
- `pnpm test`: run the Vitest suite once; watch mode is disabled in `vitest.config.ts`.
- `pnpm release:check`: run formatting, lint, type checks, and tests.
- `pnpm pack`: package the built extension as a VSIX; run `pnpm build` first.

Press F5 using **Run Extension** to launch an Extension Development Host with `playground/`. Its prelaunch task starts the development build.

## Coding Style & Naming Conventions

Use two-space indentation, LF endings, single quotes, no semicolons, and trailing commas, as configured in `.editorconfig` and `.oxfmtrc.jsonc`. Follow `.oxlintrc.jsonc` for lint rules.

Use camelCase for functions, variables, and multiword source filenames (for example, `sortJson.ts`), and PascalCase for types. Reuse existing utilities and constants. Keep command registration before provider registration in `src/index.ts`.

## Testing Guidelines

Use Vitest for automated tests. Keep test files under `tests/` and name them `<module>.test.ts`, preserving the source module's camelCase basename. Group tests by responsibility:

- `tests/commands/`: command helpers, including file operations and editor transformations.
- `tests/providers/`: completion and CodeLens providers.
- `tests/utils/`: shared utility behavior, including Markdown generation.
- `tests/helpers/`: reusable test fixtures and mocks; these are not test suites. Reuse `tests/helpers/vscode.ts` for VS Code API substitutes and document/editor factories.

Cover normal behavior, edge cases, and error or cancellation paths. Mock VS Code APIs to keep unit tests independent of the Extension Development Host and real workspace files. There is no coverage threshold.

Before submitting changes, run `pnpm format:check`, `pnpm lint`, `pnpm build`, `pnpm typecheck`, and `pnpm test` to match CI. For editor behavior changes, also manually exercise affected commands and providers in the Extension Development Host, and record reproduction steps and results in the PR.

## Commit & Pull Request Guidelines

Follow the history's Conventional Commit style: `feat: support sort JSONC`, `docs: update contributor guide`, or `chore(deps): update dependencies`. Keep commits focused.

PRs should explain the behavior change, link relevant issues, and list validation performed. Include screenshots or recordings for visible editor behavior changes.

## Generated Metadata

When changing commands or configuration in `package.json`, run `pnpm generate:meta`. Do not hand-edit `src/meta.ts`. Keep manifest declarations, implementations, and README command/configuration tables aligned.
