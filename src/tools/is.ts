interface TypeOfMap {
  string: string
  number: number
  function: CallableFunction
  object: object | null
}

export function isType<K extends keyof TypeOfMap>(value: unknown, type: K): value is TypeOfMap[K] {
  return typeof value == type
}

type UnknownArray = unknown[] | readonly unknown[]
export const isArray = Array.isArray as (value: unknown) => value is UnknownArray
