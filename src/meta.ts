// This file is generated by `vscode-ext-gen`. Do not modify manually.
// @see https://github.com/antfu/vscode-ext-gen

// Meta info
export const publisher = "ntnyq"
export const name = "vscode-dev-helper"
export const version = "0.0.9"
export const displayName = "VSCode Dev Helper"
export const description = "Personal dev helper built on top of VSCode"
export const extensionId = `${publisher}.${name}`

/**
 * Type union of all commands
 */
export type CommandKey = 
  | "vscode-dev-helper.enable-codelens"
  | "vscode-dev-helper.disable-codelens"
  | "vscode-dev-helper.open-external-url"
  | "vscode-dev-helper.create-alert"
  | "vscode-dev-helper.create-table"
  | "vscode-dev-helper.generate-node-version"
  | "vscode-dev-helper.generate-gitignore"
  | "vscode-dev-helper.generate-gitattributes"
  | "vscode-dev-helper.insert-inline-code"
  | "vscode-dev-helper.stripe-types"

/**
 * Commands map registed by `ntnyq.vscode-dev-helper`
 */
export const commands = {
  /**
   * Enable CodeLens
   * @value `vscode-dev-helper.enable-codelens`
   */
  enableCodelens: "vscode-dev-helper.enable-codelens",
  /**
   * Disable CodeLens
   * @value `vscode-dev-helper.disable-codelens`
   */
  disableCodelens: "vscode-dev-helper.disable-codelens",
  /**
   * Open External URL
   * @value `vscode-dev-helper.open-external-url`
   */
  openExternalUrl: "vscode-dev-helper.open-external-url",
  /**
   * Create Alert
   * @value `vscode-dev-helper.create-alert`
   */
  createAlert: "vscode-dev-helper.create-alert",
  /**
   * Create Table
   * @value `vscode-dev-helper.create-table`
   */
  createTable: "vscode-dev-helper.create-table",
  /**
   * Generate .node-version
   * @value `vscode-dev-helper.generate-node-version`
   */
  generateNodeVersion: "vscode-dev-helper.generate-node-version",
  /**
   * Generate .gitignore
   * @value `vscode-dev-helper.generate-gitignore`
   */
  generateGitignore: "vscode-dev-helper.generate-gitignore",
  /**
   * Generate .gitattributes
   * @value `vscode-dev-helper.generate-gitattributes`
   */
  generateGitattributes: "vscode-dev-helper.generate-gitattributes",
  /**
   * Insert Inline Code
   * @value `vscode-dev-helper.insert-inline-code`
   */
  insertInlineCode: "vscode-dev-helper.insert-inline-code",
  /**
   * Stripe Types
   * @value `vscode-dev-helper.stripe-types`
   */
  stripeTypes: "vscode-dev-helper.stripe-types",
} satisfies Record<string, CommandKey>

/**
 * Type union of all configs
 */
export type ConfigKey = 
  | "vscode-dev-helper.alertMarker"
  | "vscode-dev-helper.alertPreset"
  | "vscode-dev-helper.alertSyntax"
  | "vscode-dev-helper.alertTypes"
  | "vscode-dev-helper.alertUppercaseType"
  | "vscode-dev-helper.enableCodeLens"
  | "vscode-dev-helper.nodeVersion"

export interface ConfigKeyTypeMap {
  "vscode-dev-helper.alertMarker": string,
  "vscode-dev-helper.alertPreset": ("custom" | "github" | "obsidian" | "vitepress"),
  "vscode-dev-helper.alertSyntax": ("blockquote" | "container"),
  "vscode-dev-helper.alertTypes": string[],
  "vscode-dev-helper.alertUppercaseType": boolean,
  "vscode-dev-helper.enableCodeLens": boolean,
  "vscode-dev-helper.nodeVersion": string,
}

export interface ConfigShorthandMap {
  alertMarker: "vscode-dev-helper.alertMarker",
  alertPreset: "vscode-dev-helper.alertPreset",
  alertSyntax: "vscode-dev-helper.alertSyntax",
  alertTypes: "vscode-dev-helper.alertTypes",
  alertUppercaseType: "vscode-dev-helper.alertUppercaseType",
  enableCodeLens: "vscode-dev-helper.enableCodeLens",
  nodeVersion: "vscode-dev-helper.nodeVersion",
}

export interface ConfigItem<T extends keyof ConfigKeyTypeMap> {
  key: T,
  default: ConfigKeyTypeMap[T],
}


/**
 * Configs map registered by `ntnyq.vscode-dev-helper`
 */
export const configs = {
  /**
   * Marker for Custom Alert
   * @key `vscode-dev-helper.alertMarker`
   * @default `"!"`
   * @type `string`
   */
  alertMarker: {
    key: "vscode-dev-helper.alertMarker",
    default: "!",
  } as ConfigItem<"vscode-dev-helper.alertMarker">,
  /**
   * Preset of Alert
   * @key `vscode-dev-helper.alertPreset`
   * @default `"github"`
   * @type `string`
   */
  alertPreset: {
    key: "vscode-dev-helper.alertPreset",
    default: "github",
  } as ConfigItem<"vscode-dev-helper.alertPreset">,
  /**
   * Markdown Syntax for Custom Alert
   * @key `vscode-dev-helper.alertSyntax`
   * @default `"container"`
   * @type `string`
   */
  alertSyntax: {
    key: "vscode-dev-helper.alertSyntax",
    default: "container",
  } as ConfigItem<"vscode-dev-helper.alertSyntax">,
  /**
   * Types for Custom Alert
   * @key `vscode-dev-helper.alertTypes`
   * @default `["danger","info","success","tip","warning"]`
   * @type `array`
   */
  alertTypes: {
    key: "vscode-dev-helper.alertTypes",
    default: ["danger","info","success","tip","warning"],
  } as ConfigItem<"vscode-dev-helper.alertTypes">,
  /**
   * Use Uppercase Type for Custom Alert
   * @key `vscode-dev-helper.alertUppercaseType`
   * @default `false`
   * @type `boolean`
   */
  alertUppercaseType: {
    key: "vscode-dev-helper.alertUppercaseType",
    default: false,
  } as ConfigItem<"vscode-dev-helper.alertUppercaseType">,
  /**
   * Enable CodeLens
   * @key `vscode-dev-helper.enableCodeLens`
   * @default `true`
   * @type `boolean`
   */
  enableCodeLens: {
    key: "vscode-dev-helper.enableCodeLens",
    default: true,
  } as ConfigItem<"vscode-dev-helper.enableCodeLens">,
  /**
   * Default version for .node-version
   * @key `vscode-dev-helper.nodeVersion`
   * @default `"lts-latest"`
   * @type `string`
   */
  nodeVersion: {
    key: "vscode-dev-helper.nodeVersion",
    default: "lts-latest",
  } as ConfigItem<"vscode-dev-helper.nodeVersion">,
}

export interface ScopedConfigKeyTypeMap {
  "alertMarker": string,
  "alertPreset": ("custom" | "github" | "obsidian" | "vitepress"),
  "alertSyntax": ("blockquote" | "container"),
  "alertTypes": string[],
  "alertUppercaseType": boolean,
  "enableCodeLens": boolean,
  "nodeVersion": string,
}

export const scopedConfigs = {
  scope: "vscode-dev-helper",
  defaults: {
    "alertMarker": "!",
    "alertPreset": "github",
    "alertSyntax": "container",
    "alertTypes": ["danger","info","success","tip","warning"],
    "alertUppercaseType": false,
    "enableCodeLens": true,
    "nodeVersion": "lts-latest",
  } satisfies ScopedConfigKeyTypeMap,
}

export interface NestedConfigs {
  "vscode-dev-helper": {
    "alertMarker": string,
    "alertPreset": ("custom" | "github" | "obsidian" | "vitepress"),
    "alertSyntax": ("blockquote" | "container"),
    "alertTypes": string[],
    "alertUppercaseType": boolean,
    "enableCodeLens": boolean,
    "nodeVersion": string,
  },
}

export interface NestedScopedConfigs {
  "alertMarker": string,
  "alertPreset": ("custom" | "github" | "obsidian" | "vitepress"),
  "alertSyntax": ("blockquote" | "container"),
  "alertTypes": string[],
  "alertUppercaseType": boolean,
  "enableCodeLens": boolean,
  "nodeVersion": string,
}

