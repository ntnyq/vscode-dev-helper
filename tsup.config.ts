import process from 'node:process'
import { defineConfig } from 'tsup'
import pkg from './package.json'

export default defineConfig({
  clean: true,
  dts: false,
  entry: ['src/index.ts'],
  env: {
    NODE_ENV: process.env.NODE_ENV || 'production',
  },
  external: ['vscode'],
  format: ['cjs'],
  minify: true,
  noExternal: [
    // Bundle all dependencies
    ...Object.keys(pkg.dependencies || {}),
  ],
  sourcemap: process.env.NODE_ENV === 'development',
  watch: process.env.NODE_ENV === 'development',
})
