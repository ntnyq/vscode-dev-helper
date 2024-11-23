import process from 'node:process'
import { defineConfig } from 'tsup'
import pkg from './package.json'

console.log([...Object.keys(pkg.dependencies || {})])

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
  noExternal: [
    // Bundle all dependencies
    ...Object.keys(pkg.dependencies || {}),
  ],
})
