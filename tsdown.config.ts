import process from 'node:process'
import { defineConfig } from 'tsdown'
import pkg from './package.json' with { type: 'json' }

const isDev = () => process.env.NODE_ENV === 'development'

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  external: ['vscode'],
  inlineOnly: false,
  minify: !isDev(),
  platform: 'node',
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
  // inlineOnly: [
  //   '@babel/parser',
  //   'ast-kit',
  //   'validate-npm-package-name',
  //   'find-npm-packages',
  //   'oxidase',
  //   '@reactive-vscode/reactivity',
  //   'reactive-vscode',
  //   '@ntnyq/utils',
  //   'tsdown',
  // ],
  noExternal: [
    // Bundle all dependencies
    ...Object.keys(pkg.dependencies || {}),
  ],
})
