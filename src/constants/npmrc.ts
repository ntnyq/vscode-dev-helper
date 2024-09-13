import { BOOL_COMPLETION_ITEMS } from './shared'

/**
 * Npmrc configuration completion items
 *
 * @see {@link https://pnpm.io/npmrc}
 */
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

  // Node Modules Settings
  'node-linker': ['isolated', 'hoisted', 'pnp'],

  // Nodejs Settings
  'use-node-version': [''],
  'node-version': [''],

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
  'disallow-workspace-cycles': BOOL_COMPLETION_ITEMS,

  // Cli Settings
  'recursive-install': BOOL_COMPLETION_ITEMS,
  'engine-strict': BOOL_COMPLETION_ITEMS,
  'shell-emulator': BOOL_COMPLETION_ITEMS,
  'no-color': ['auto', 'always', 'never'],

  // Other settings
  'dedupe-direct-deps': BOOL_COMPLETION_ITEMS,
  'save-prefix': ['^', '~', ''],
  'package-manager-strict': BOOL_COMPLETION_ITEMS,
}

export type NPMRCCompletionKeyUnion = keyof typeof NPMRC_COMPLETION_ITEMS
export const NPMRC_COMPLETION_KEYS = Object.keys(NPMRC_COMPLETION_ITEMS)

export const NPMRC_CODELENS_ITEMS = {
  registry: {
    description: 'The base URL of the npm package registry (trailing slash included).',
    url: 'https://pnpm.io/npmrc#registry',
  },
  'shamefully-hoist': {
    description:
      'By default, pnpm creates a semistrict node_modules, meaning dependencies have access to undeclared dependencies but modules outside of node_modules do not. With this layout, most of the packages in the ecosystem work with no issues. However, if some tooling only works when the hoisted dependencies are in the root of node_modules, you can set this to true to hoist them for you.',
    url: 'https://pnpm.io/npmrc#shamefully-hoist',
  },
  'shell-emulator': {
    description:
      'When set to true, pnpm will emulate the shell environment when running lifecycle scripts. This is useful when you have scripts that rely on shell features, such as globbing or pipes.',
    url: 'https://pnpm.io/npmrc#shell-emulator',
  },
  'ignore-workspace-root-check': {
    description:
      'When set to true, pnpm will not check if the workspace root is in the workspace. This is useful when you have a workspace that is not in the workspace root.',
    url: 'https://pnpm.io/npmrc#ignore-workspace-root-check',
  },
  'auto-install-peers': {
    description:
      'When set to true, pnpm will automatically install peer dependencies for you. This is useful when you have a package that has peer dependencies that are not installed.',
    url: 'https://pnpm.io/npmrc#auto-install-peers',
  },
}

export type NPMRCCodelensKeyUnion = keyof typeof NPMRC_CODELENS_ITEMS
export const NPMRC_CODELENS_KEYS = Object.keys(NPMRC_CODELENS_ITEMS)
