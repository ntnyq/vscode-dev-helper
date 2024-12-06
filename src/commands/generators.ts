import { config } from '../config'
import {
  eslintConfigTemplate,
  gitAttributesTemplate,
  gitIgnoreTemplate,
  prettierConfigTemplate,
} from '../templates'
import { generateFileInWorkspace } from '../utils'

export async function generateGitIgnore() {
  await generateFileInWorkspace('.gitignore', gitIgnoreTemplate)
}

export async function generateGitAttributes() {
  await generateFileInWorkspace('.gitattributes', gitAttributesTemplate)
}

export async function generateNodeVersion() {
  await generateFileInWorkspace('.node-version', config.nodeVersion)
}

export async function generateESLintConfig() {
  await generateFileInWorkspace('eslint.config.mjs', eslintConfigTemplate)
}

export async function generatePrettierConfig() {
  await generateFileInWorkspace('prettier.config.mjs', prettierConfigTemplate)
}
