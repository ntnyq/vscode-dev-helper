/**
 * Create a GitHub alert.
 *
 * @see https://github.com/orgs/community/discussions/16925
 */
export function createGitHubAlert(type: string) {
  return `
> [!${type.toUpperCase()}]
> This is an example for ${type.toUpperCase()}`.trimStart()
}
