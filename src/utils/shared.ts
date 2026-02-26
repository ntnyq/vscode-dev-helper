/**
 * Creates a repeated non-breaking space sequence.
 *
 * @param count - Number of non-breaking spaces to create.
 * @returns The generated HTML non-breaking spaces.
 */
export function createSpace(count: number): string {
  return '&nbsp;'.repeat(count)
}
