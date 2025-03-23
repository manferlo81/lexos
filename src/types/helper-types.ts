// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type Void = void
export type Nullish = null | undefined
export type Falsy = Nullish | false

export type NullishReturn = Nullish | Void
export type FalsyReturn = Falsy | Void

export interface WithType<T> {
  type: T
}

export interface WithLength {
  length: number
}

export interface WithValue {
  value: string
}

export type CodeProcessingFunction<R> = (input: string, pos: number) => R
export type InitializerFunction<R> = (input: string, offset?: number) => R

export type GetTokenTypeBase<R> = (value: string) => R
