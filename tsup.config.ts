import process from 'node:process'
import { defineConfig } from 'tsup'
import pkg from './package.json'

export default defineConfig({
  clean: true,
  dts: false,
  entry: ['src/index.ts'],
  external: ['vscode'],
  format: ['cjs'],
  minify: process.env.NODE_ENV !== 'development',
  shims: true,
  sourcemap: process.env.NODE_ENV === 'development',
  splitting: true,
  watch: process.env.NODE_ENV === 'development',
  env: {
    NODE_ENV: process.env.NODE_ENV || 'production',
  },
  noExternal: [
    // Bundle all dependencies
    ...Object.keys(pkg.dependencies || {}),
  ],
})
