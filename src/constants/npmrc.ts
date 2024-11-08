/**
 * npmrc
 * @see {@link https://pnpm.io/npmrc}
 */

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
  hoist: {
    description:
      'When true, all dependencies are hoisted to node_modules/.pnpm/node_modules. This makes unlisted dependencies accessible to all packages inside node_modules.',
    url: 'https://pnpm.io/npmrc#hoist',
  },
  'hoist-workspace-packages': {
    description:
      'When true, packages from the workspaces are symlinked to either <workspace_root>/node_modules/.pnpm/node_modules or to <workspace_root>/node_modules depending on other hoisting settings (hoist-pattern and public-hoist-pattern).',
    url: 'https://pnpm.io/npmrc#hoist-workspace-packages',
  },
  'hoist-pattern': {
    description:
      'Tells pnpm which packages should be hoisted to node_modules/.pnpm/node_modules. By default, all packages are hoisted - however, if you know that only some flawed packages have phantom dependencies, you can use this option to exclusively hoist the phantom dependencies (recommended).',
    url: 'https://pnpm.io/npmrc#hoist-pattern',
  },
  'public-hoist-pattern': {
    description: `Unlike hoist-pattern, which hoists dependencies to a hidden modules directory inside the virtual store, public-hoist-pattern hoists dependencies matching the pattern to the root modules directory. Hoisting to the root modules directory means that application code will have access to phantom dependencies, even if they modify the resolution strategy improperly.

    This setting is useful when dealing with some flawed pluggable tools that don't resolve dependencies properly.`,
    url: 'https://pnpm.io/npmrc#public-hoist-pattern',
  },
  'shamefully-hoist': {
    description:
      'By default, pnpm creates a semistrict node_modules, meaning dependencies have access to undeclared dependencies but modules outside of node_modules do not. With this layout, most of the packages in the ecosystem work with no issues. However, if some tooling only works when the hoisted dependencies are in the root of node_modules, you can set this to true to hoist them for you.',
    url: 'https://pnpm.io/npmrc#shamefully-hoist',
  },
  'modules-dir': {
    description: 'The directory in which dependencies will be installed (instead of node_modules).',
    url: 'https://pnpm.io/npmrc#modules-dir',
  },
  'node-linker': {
    description: 'Defines what linker should be used for installing Node packages.',
    url: 'https://pnpm.io/npmrc#node-linker',
  },
  symlink: {
    description:
      'When symlink is set to false, pnpm creates a virtual store directory without any symlinks. It is a useful setting together with node-linker=pnp.',
    url: 'https://pnpm.io/npmrc#symlink',
  },
  'enable-modules-dir': {
    description:
      'When false, pnpm will not write any files to the modules directory (node_modules). This is useful for when the modules directory is mounted with filesystem in userspace (FUSE). There is an experimental CLI that allows you to mount a modules directory with FUSE: @pnpm/mount-modules.',
    url: 'https://pnpm.io/npmrc#enable-modules-dir',
  },
  'virtual-store-dir': {
    description:
      'The directory with links to the store. All direct and indirect dependencies of the project are linked into this directory.',
    url: 'https://pnpm.io/npmrc#virtual-store-dir',
  },
  registry: {
    description: 'The base URL of the npm package registry (trailing slash included).',
    url: 'https://pnpm.io/npmrc#registry',
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
