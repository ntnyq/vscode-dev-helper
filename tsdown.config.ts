import process from 'node:process'
import { defineConfig } from 'tsdown'
import pkg from './package.json'

const isDev = () => process.env.NODE_ENV === 'development'

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  external: ['vscode'],
  format: 'cjs',
  minify: !isDev(),
  plugins: [],
  shims: true,
  sourcemap: isDev(),
  watch: isDev(),
  copy: [
    {
      from: 'node_modules/oxidase/wasm_node/oxidase_wasm_bindings_bg.wasm',
      to: 'dist/oxidase_wasm_bindings_bg.wasm',
    },
  ],
  noExternal: [
    // Bundle all dependencies
    ...Object.keys(pkg.dependencies || {}),
  ],
})
