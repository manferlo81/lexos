export function makeInsensitive(value: string, insensitive?: unknown) {
  return insensitive ? value.toLowerCase() : value
}
