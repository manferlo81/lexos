export function validateLength(length: number, pos: number, max: number) {
  const remaining = max - pos
  if (length > remaining) throw new Error('Invalid length')
  return length
}
