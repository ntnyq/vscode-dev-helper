import type { Awaitable, InteropModuleDefault } from '../types'

/**
 * resolve module with interop default
 */
export async function interopDefault<T>(
  mod: Awaitable<T>,
): Promise<Awaited<InteropModuleDefault<T>>> {
  const resolved = await mod
  return (mod as any).default || resolved
}
