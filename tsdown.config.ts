import process from 'node:process'
import { defineConfig } from 'tsdown'
import pkg from './package.json' with { type: 'json' }

const isDev = (): boolean => process.env.NODE_ENV === 'development'

export default defineConfig({
  clean: true,
  copy: [
    {
      from: 'node_modules/oxidase/wasm_node/oxidase_wasm_bindings_bg.wasm',
      to: 'dist/oxidase_wasm_bindings_bg.wasm',
    },
  ],
  deps: {
    alwaysBundle: Object.keys(pkg.dependencies),
    neverBundle: ['vscode'],
    onlyBundle: false,
  },
  entry: ['src/index.ts'],
  minify: !isDev(),
  platform: 'node',
  plugins: [],
  shims: true,
  sourcemap: isDev(),
  watch: isDev(),
})
