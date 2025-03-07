interface TypeOfMap {
  string: string
  function: CallableFunction
}

export function isType<K extends keyof TypeOfMap>(value: unknown, type: K): value is TypeOfMap[K]
export function isType(value: unknown, type: string) {
  return typeof value === type
}

type UnknownArray = unknown[] | readonly unknown[]
export const isArray = Array.isArray as (value: unknown) => value is UnknownArray
