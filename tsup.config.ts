import { copyFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { defineConfig } from 'tsup'
import pkg from './package.json'
import type { Plugin } from 'tsup'

const NODE_ENV = process.env.NODE_ENV || 'production'
const isProduction = NODE_ENV === 'production'

const resolve = (...args: string[]) => path.resolve(__dirname, ...args)

/**
 * The `Plugin` type of tsup is not exported
 *
 * @see https://github.com/egoist/tsup/pull/1264
 */
const syncFiles = (): Plugin => ({
  name: 'sync-files',
  async buildEnd() {
    await copyFile(
      resolve('node_modules/oxidase/wasm_node/oxidase_wasm_bindings_bg.wasm'),
      resolve('dist/oxidase_wasm_bindings_bg.wasm'),
    )
    this.logger.success('plugin:sync-files', 'Sync files successfully')
  },
})

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  external: ['vscode'],
  format: 'cjs',
  minify: isProduction,
  shims: true,
  sourcemap: !isProduction,
  splitting: true,
  watch: !isProduction,
  env: {
    NODE_ENV,
  },
  noExternal: [
    // Bundle all dependencies
    ...Object.keys(pkg.dependencies || {}),
  ],
  plugins: [
    // sync wasm file of oxidase
    syncFiles(),
  ],
})
