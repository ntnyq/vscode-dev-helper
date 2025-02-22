import process from 'node:process'
import { defineConfig } from 'tsup'
import pkg from './package.json'

const NODE_ENV = process.env.NODE_ENV || 'production'
const isProduction = NODE_ENV === 'production'

export default defineConfig({
  clean: true,
  dts: false,
  entry: ['src/index.ts'],
  external: ['vscode'],
  format: ['cjs'],
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
})
