/**
 * Capitalizes the first character of a string.
 *
 * @param value - The input string.
 * @returns The string with an uppercased first character.
 */
export function upperFirst(value: string): string {
  return value[0].toUpperCase() + value.slice(1)
}
