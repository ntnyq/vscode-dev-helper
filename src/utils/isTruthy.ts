export function isTruthy<T>(value: T | undefined): value is T {
  return Boolean(value)
}
