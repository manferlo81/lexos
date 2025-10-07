export type Nullish = null | undefined
export type Falsy = Nullish | false

export interface WithType<T> {
  type: T
}

export interface WithLength {
  length: number
}

export interface WithValue<V extends string> {
  value: V
}

export type GetTokenTypeBase<R> = (value: string) => R

export interface RuleBase<R> {
  (input: string, pos: number): R | Falsy
  (input: string, pos: number): void
}

export type InitializerFunction<R> = (input: string, offset?: number) => R
