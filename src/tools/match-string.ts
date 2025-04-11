type StringMatchFunction = (partial: string) => boolean

export function createStringMatchFunction(value: string, insensitive?: unknown): StringMatchFunction {
  // return case sensitive string match function
  if (!insensitive) return (partial: string) => partial === value

  // make value insensitive
  const referenceValue = value.toLowerCase()

  // return case insensitive string match function
  return (partial: string) => partial.toLowerCase() === referenceValue
}
