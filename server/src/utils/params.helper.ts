/**
 * Helper functions to handle parameter type conversions
 */

/**
 * Converts string | string[] to string
 */
export function toString(value: string | string[]): string {
  if (Array.isArray(value)) {
    return value[0] || '';
  }
  return value;
}

/**
 * Converts string | string[] to string array
 */
export function toStringArray(value: string | string[]): string[] {
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
}

/**
 * Gets first string from string | string[]
 */
export function getFirstString(value: string | string[]): string {
  return Array.isArray(value) ? value[0] : value;
}
