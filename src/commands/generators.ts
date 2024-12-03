import { config } from '../config'
import { gitattributesTemplate, gitignoreTemplate } from '../templates'
import { generateFileInWorkspace } from '../utils'

export async function generateGitIgnore() {
  await generateFileInWorkspace('.gitignore', gitignoreTemplate)
}

export async function generateGitAttributes() {
  await generateFileInWorkspace('.gitattributes', gitattributesTemplate)
}

export async function generateNodeVersion() {
  await generateFileInWorkspace('.node-version', config.nodeVersion)
}
