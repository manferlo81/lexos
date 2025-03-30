export function advanceCurrentPos(length: number, pos: number, max: number) {
  const nextPosition = pos + length
  if (nextPosition > max) throw new Error('Invalid length')
  return nextPosition
}
