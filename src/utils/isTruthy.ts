/**
 * Checks whether a value is truthy and narrows its type.
 *
 * @param value - The value to check.
 * @returns True when the value is truthy.
 */
export function isTruthy<T>(value: T | undefined): value is T {
  return Boolean(value)
}
