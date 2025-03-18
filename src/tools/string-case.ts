export function makeInsensitive(value: string, insensitive?: unknown): string {
  return insensitive ? value.toLowerCase() : value
}
