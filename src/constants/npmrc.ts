/**
 * npmrc
 * @see {@link https://pnpm.io/npmrc}
 */

import { BOOL_COMPLETION_ITEMS } from './shared'

export const NPMRC_COMPLETION_ITEMS = {
  // Peer Dependency Settings
  'auto-install-peers': BOOL_COMPLETION_ITEMS,

  // Other settings
  'dedupe-direct-deps': BOOL_COMPLETION_ITEMS,
  'dedupe-peer-dependents': BOOL_COMPLETION_ITEMS,
  'disallow-workspace-cycles': BOOL_COMPLETION_ITEMS,
  'engine-strict': BOOL_COMPLETION_ITEMS,

  // Dependency Hoisting Settings
  hoist: BOOL_COMPLETION_ITEMS,
  'hoist-pattern': [''],
  'ignore-workspace-cycles': BOOL_COMPLETION_ITEMS,
  'ignore-workspace-root-check': BOOL_COMPLETION_ITEMS,

  'include-workspace-root': BOOL_COMPLETION_ITEMS,
  'install-links': BOOL_COMPLETION_ITEMS,

  // Workspace Settings
  'link-workspace-packages': [...BOOL_COMPLETION_ITEMS, 'deep'],
  // Lockfile Settings
  lockfile: BOOL_COMPLETION_ITEMS,

  'lockfile-include-tarball-url': BOOL_COMPLETION_ITEMS,
  'no-color': ['auto', 'always', 'never'],
  // Node Modules Settings
  'node-linker': ['isolated', 'hoisted', 'pnp'],
  'node-version': [''],

  'package-lock': BOOL_COMPLETION_ITEMS,
  'package-manager-strict': BOOL_COMPLETION_ITEMS,
  'package-manager-strict-version': BOOL_COMPLETION_ITEMS,
  'prefer-frozen-lockfile': BOOL_COMPLETION_ITEMS,
  'public-hoist-pattern': [''],
  // Cli Settings
  'recursive-install': BOOL_COMPLETION_ITEMS,
  // Registry
  'resolve-peers-from-workspace-root': BOOL_COMPLETION_ITEMS,

  'save-prefix': ['^', '~', ''],
  'save-workspace-protocol': [...BOOL_COMPLETION_ITEMS, 'rolling'],
  'shamefully-hoist': BOOL_COMPLETION_ITEMS,
  'shared-workspace-lockfile': BOOL_COMPLETION_ITEMS,

  'shell-emulator': BOOL_COMPLETION_ITEMS,
  'strict-peer-dependencies': BOOL_COMPLETION_ITEMS,
  // Nodejs Settings
  'use-node-version': [''],
  registry: [
    'https://registry.npmjs.org/',
    'https://registry.yarnpkg.com/',
    'https://registry.npmmirror.com/',
  ],
}

export type NPMRCCompletionKeyUnion = keyof typeof NPMRC_COMPLETION_ITEMS
export const NPMRC_COMPLETION_KEYS = Object.keys(NPMRC_COMPLETION_ITEMS)

export const NPMRC_CODELENS_ITEMS = {
  'auto-install-peers': {
    url: 'https://pnpm.io/npmrc#auto-install-peers',
    description:
      'When set to `true`, pnpm will automatically install peer dependencies for you. This is useful when you have a package that has peer dependencies that are not installed.',
  },
  'enable-modules-dir': {
    url: 'https://pnpm.io/npmrc#enable-modules-dir',
    description:
      'When false, pnpm will not write any files to the modules directory (node_modules). This is useful for when the modules directory is mounted with filesystem in userspace (FUSE). There is an experimental CLI that allows you to mount a modules directory with FUSE: @pnpm/mount-modules.',
  },
  'engine-strict': {
    description: `If this is enabled, pnpm will not install any package that claims to not be compatible with the current Node version.\n\nRegardless of this configuration, installation will always fail if a project (not a dependency) specifies an incompatible version in its \`engines\` field.`,
    url: 'https://pnpm.io/npmrc#engine-strict',
  },
  hoist: {
    url: 'https://pnpm.io/npmrc#hoist',
    description:
      'When true, all dependencies are hoisted to node_modules/.pnpm/node_modules. This makes unlisted dependencies accessible to all packages inside node_modules.',
  },
  'hoist-pattern': {
    url: 'https://pnpm.io/npmrc#hoist-pattern',
    description:
      'Tells pnpm which packages should be hoisted to node_modules/.pnpm/node_modules. By default, all packages are hoisted - however, if you know that only some flawed packages have phantom dependencies, you can use this option to exclusively hoist the phantom dependencies (recommended).',
  },
  'hoist-workspace-packages': {
    url: 'https://pnpm.io/npmrc#hoist-workspace-packages',
    description:
      'When true, packages from the workspaces are symlinked to either <workspace_root>/node_modules/.pnpm/node_modules or to <workspace_root>/node_modules depending on other hoisting settings (hoist-pattern and public-hoist-pattern).',
  },
  'ignore-workspace-root-check': {
    url: 'https://pnpm.io/npmrc#ignore-workspace-root-check',
    description:
      'When set to true, pnpm will not check if the workspace root is in the workspace. This is useful when you have a workspace that is not in the workspace root.',
  },
  lockfile: {
    description: `When set to \`false\`, pnpm won't read or generate a \`pnpm-lock.yaml\` file.`,
    url: 'https://pnpm.io/npmrc#lockfile',
  },
  'modules-dir': {
    url: 'https://pnpm.io/npmrc#modules-dir',
    description:
      'The directory in which dependencies will be installed (instead of node_modules).',
  },
  'node-linker': {
    url: 'https://pnpm.io/npmrc#node-linker',
    description:
      'Defines what linker should be used for installing Node packages.',
  },
  'package-manager-strict': {
    description: `If this setting is disabled, pnpm will not fail if a different package manager is specified in the \`packageManager\` field of \`package.json\`. When enabled, only the package name is checked (since pnpm v9.2.0), so you can still run any version of pnpm regardless of the version specified in the \`packageManager\` field.\n\nAlternatively, you can disable this setting by setting the \`COREPACK_ENABLE_STRICT\` environment variable to 0.`,
    url: 'https://pnpm.io/npmrc#package-manager-strict',
  },
  'package-manager-strict-version': {
    description: `When enabled, pnpm will fail if its version doesn't exactly match the version specified in the \`packageManager\` field of \`package.json\`.`,
    url: 'https://pnpm.io/npmrc#package-manager-strict-version',
  },
  'public-hoist-pattern': {
    url: 'https://pnpm.io/npmrc#public-hoist-pattern',
    description: `Unlike hoist-pattern, which hoists dependencies to a hidden modules directory inside the virtual store, public-hoist-pattern hoists dependencies matching the pattern to the root modules directory. Hoisting to the root modules directory means that application code will have access to phantom dependencies, even if they modify the resolution strategy improperly.

    This setting is useful when dealing with some flawed pluggable tools that don't resolve dependencies properly.`,
  },
  registry: {
    url: 'https://pnpm.io/npmrc#registry',
    description:
      'The base URL of the npm package registry (trailing slash included).',
  },
  'shamefully-hoist': {
    url: 'https://pnpm.io/npmrc#shamefully-hoist',
    description:
      'By default, pnpm creates a semistrict node_modules, meaning dependencies have access to undeclared dependencies but modules outside of node_modules do not. With this layout, most of the packages in the ecosystem work with no issues. However, if some tooling only works when the hoisted dependencies are in the root of node_modules, you can set this to true to hoist them for you.',
  },
  'shell-emulator': {
    url: 'https://pnpm.io/npmrc#shell-emulator',
    description:
      'When set to true, pnpm will emulate the shell environment when running lifecycle scripts. This is useful when you have scripts that rely on shell features, such as globbing or pipes.',
  },
  'strict-peer-dependencies': {
    url: 'https://pnpm.io/npmrc#strict-peer-dependencies',
    description:
      'If this is enabled, commands will fail if there is a missing or invalid peer dependency in the tree.',
  },
  symlink: {
    url: 'https://pnpm.io/npmrc#symlink',
    description:
      'When symlink is set to false, pnpm creates a virtual store directory without any symlinks. It is a useful setting together with node-linker=pnp.',
  },
  'virtual-store-dir': {
    url: 'https://pnpm.io/npmrc#virtual-store-dir',
    description:
      'The directory with links to the store. All direct and indirect dependencies of the project are linked into this directory.',
  },
}

export type NPMRCCodelensKeyUnion = keyof typeof NPMRC_CODELENS_ITEMS
export const NPMRC_CODELENS_KEYS = Object.keys(NPMRC_CODELENS_ITEMS)
