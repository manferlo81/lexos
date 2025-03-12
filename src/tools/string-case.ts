export function makeInsensitive(value: string, insensitive?: boolean) {
  return insensitive ? value.toLowerCase() : value
}
