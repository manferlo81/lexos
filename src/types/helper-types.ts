// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type Void = void
export type Nullish = null | undefined
export type Falsy = Nullish | false

export type NullishReturn = Nullish | Void
export type FalsyReturn = Falsy | Void

export interface Typed<T> {
  type: T
}

export interface Lengthy {
  length: number
}

export interface Valued {
  value: string
}

export type CodeProcessingFunction<R> = (input: string, pos: number) => R

export type GetTokenTypeBase<R> = (value: string) => R
