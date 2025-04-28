type StringMatchFunction = (partial: string) => boolean

export function createStringMatchFunction(reference: string, insensitive?: unknown): StringMatchFunction {

  // return case sensitive string match function
  if (!insensitive) return (value: string) => value === reference

  // make value insensitive
  const lowerCaseReference = reference.toLowerCase()

  // return case insensitive string match function
  return (value: string) => value.toLowerCase() === lowerCaseReference
}
