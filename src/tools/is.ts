interface TypeOfMap {
  string: string
  number: number
  function: CallableFunction
  object: object | null
}

export function isType<K extends keyof TypeOfMap>(value: unknown, type: K, ...types: readonly K[]): value is TypeOfMap[K]
export function isType<K extends keyof TypeOfMap>(value: unknown, ...types: readonly K[]): value is TypeOfMap[K] {
  return types.includes(typeof value as K)
}

type UnknownArray = unknown[] | readonly unknown[]
export const isArray = Array.isArray as (value: unknown) => value is UnknownArray
