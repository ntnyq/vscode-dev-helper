export type InteropModuleDefault<T> = T extends { default: infer U } ? U : T
