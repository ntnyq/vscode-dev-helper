// This file is generated by `vscode-ext-gen`. Do not modify manually.
// @see https://github.com/antfu/vscode-ext-gen

// Meta info
export const publisher = "ntnyq"
export const name = "vscode-dev-helper"
export const version = "0.0.7"
export const displayName = "VSCode Dev Helper"
export const description = "Personal dev helper built on top of VSCode"
export const extensionId = `${publisher}.${name}`

/**
 * Type union of all commands
 */
export type CommandKey = 
  | "vscode-dev-helper.enable-codelens"
  | "vscode-dev-helper.disable-codelens"
  | "vscode-dev-helper.codelens-action"
  | "vscode-dev-helper.create-alert"
  | "vscode-dev-helper.generate-node-version"
  | "vscode-dev-helper.insert-inline-code"

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
   * Trigger CodeLens Action
   * @value `vscode-dev-helper.codelens-action`
   */
  codelensAction: "vscode-dev-helper.codelens-action",
  /**
   * Create Alert
   * @value `vscode-dev-helper.create-alert`
   */
  createAlert: "vscode-dev-helper.create-alert",
  /**
   * Generate .node-version
   * @value `vscode-dev-helper.generate-node-version`
   */
  generateNodeVersion: "vscode-dev-helper.generate-node-version",
  /**
   * Insert Inline Code
   * @value `vscode-dev-helper.insert-inline-code`
   */
  insertInlineCode: "vscode-dev-helper.insert-inline-code",
} satisfies Record<string, CommandKey>

/**
 * Type union of all configs
 */
export type ConfigKey = 
  | "vscode-dev-helper.enableCodeLens"
  | "vscode-dev-helper.alertPreset"
  | "vscode-dev-helper.alertTypes"
  | "vscode-dev-helper.alertMarker"
  | "vscode-dev-helper.alertSyntax"
  | "vscode-dev-helper.alertUppercaseType"
  | "vscode-dev-helper.nodeVersion"

export interface ConfigKeyTypeMap {
  "vscode-dev-helper.enableCodeLens": boolean,
  "vscode-dev-helper.alertPreset": ("github" | "obsidian" | "vitepress" | "custom"),
  "vscode-dev-helper.alertTypes": string[],
  "vscode-dev-helper.alertMarker": string,
  "vscode-dev-helper.alertSyntax": ("blockquote" | "container"),
  "vscode-dev-helper.alertUppercaseType": boolean,
  "vscode-dev-helper.nodeVersion": string,
}

export interface ConfigShorthandMap {
  enableCodeLens: "vscode-dev-helper.enableCodeLens",
  alertPreset: "vscode-dev-helper.alertPreset",
  alertTypes: "vscode-dev-helper.alertTypes",
  alertMarker: "vscode-dev-helper.alertMarker",
  alertSyntax: "vscode-dev-helper.alertSyntax",
  alertUppercaseType: "vscode-dev-helper.alertUppercaseType",
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
   * Types for Custom Alert
   * @key `vscode-dev-helper.alertTypes`
   * @default `["info","tip","success","warning","danger"]`
   * @type `array`
   */
  alertTypes: {
    key: "vscode-dev-helper.alertTypes",
    default: ["info","tip","success","warning","danger"],
  } as ConfigItem<"vscode-dev-helper.alertTypes">,
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
  "enableCodeLens": boolean,
  "alertPreset": ("github" | "obsidian" | "vitepress" | "custom"),
  "alertTypes": string[],
  "alertMarker": string,
  "alertSyntax": ("blockquote" | "container"),
  "alertUppercaseType": boolean,
  "nodeVersion": string,
}

export const scopedConfigs = {
  scope: "vscode-dev-helper",
  defaults: {
    "enableCodeLens": true,
    "alertPreset": "github",
    "alertTypes": ["info","tip","success","warning","danger"],
    "alertMarker": "!",
    "alertSyntax": "container",
    "alertUppercaseType": false,
    "nodeVersion": "lts-latest",
  } satisfies ScopedConfigKeyTypeMap,
}

export interface NestedConfigs {
  "vscode-dev-helper": {
    "enableCodeLens": boolean,
    "alertPreset": ("github" | "obsidian" | "vitepress" | "custom"),
    "alertTypes": string[],
    "alertMarker": string,
    "alertSyntax": ("blockquote" | "container"),
    "alertUppercaseType": boolean,
    "nodeVersion": string,
  },
}

export interface NestedScopedConfigs {
  "enableCodeLens": boolean,
  "alertPreset": ("github" | "obsidian" | "vitepress" | "custom"),
  "alertTypes": string[],
  "alertMarker": string,
  "alertSyntax": ("blockquote" | "container"),
  "alertUppercaseType": boolean,
  "nodeVersion": string,
}

