import { BOOL_COMPLETION_ITEMS } from './shared'

export const NPMRC_COMPLETION_ITEMS = {
  // Registry
  registry: [
    'https://registry.npmjs.org/',
    'https://registry.yarnpkg.com/',
    'https://registry.npmmirror.com/',
  ],

  // Lockfile Settings
  lockfile: BOOL_COMPLETION_ITEMS,
  'prefer-frozen-lockfile': BOOL_COMPLETION_ITEMS,
  'lockfile-include-tarball-url': BOOL_COMPLETION_ITEMS,

  // Dependency Hoisting Settings
  hoist: BOOL_COMPLETION_ITEMS,
  'hoist-pattern': [''],
  'public-hoist-pattern': [''],
  'shamefully-hoist': BOOL_COMPLETION_ITEMS,

  // Peer Dependency Settings
  'auto-install-peers': BOOL_COMPLETION_ITEMS,
  'dedupe-peer-dependents': BOOL_COMPLETION_ITEMS,
  'strict-peer-dependencies': BOOL_COMPLETION_ITEMS,
  'resolve-peers-from-workspace-root': BOOL_COMPLETION_ITEMS,

  // Workspace Settings
  'link-workspace-packages': [...BOOL_COMPLETION_ITEMS, 'deep'],
  'shared-workspace-lockfile': BOOL_COMPLETION_ITEMS,
  'save-workspace-protocol': [...BOOL_COMPLETION_ITEMS, 'rolling'],
  'include-workspace-root': BOOL_COMPLETION_ITEMS,
  'ignore-workspace-cycles': BOOL_COMPLETION_ITEMS,
  'ignore-workspace-root-check': BOOL_COMPLETION_ITEMS,

  // Cli Settings
  'recursive-install': BOOL_COMPLETION_ITEMS,
  'engine-strict': BOOL_COMPLETION_ITEMS,
  'shell-emulator': BOOL_COMPLETION_ITEMS,

  // Other settings
  'dedupe-direct-deps': BOOL_COMPLETION_ITEMS,
}

export type NPMRCKeyUnion = keyof typeof NPMRC_COMPLETION_ITEMS

export const NPMRC_COMPLETION_KEYS = Object.keys(NPMRC_COMPLETION_ITEMS)

export class NPMRCCompletionItems {
  public static GetCompletionItem(key: NPMRCKeyUnion) {
    return NPMRC_COMPLETION_ITEMS[key] ?? null
  }
}
