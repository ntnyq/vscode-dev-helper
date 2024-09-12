import process from 'node:process'
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  dts: false,
  clean: true,
  minify: true,
  watch: process.env.NODE_ENV === 'development',
  sourcemap: process.env.NODE_ENV === 'development',
  env: {
    NODE_ENV: process.env.NODE_ENV || 'production',
  },
  external: ['vscode'],
  noExternal: ['reactive-vscode'],
})
