// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type Void = void
export type Nullish = null | undefined
export type Falsy = Nullish | false
export type PotentiallyFalsy<R> = R | Falsy

export type NullishReturn = Nullish | Void
export type FalsyReturn = Falsy | Void
export type PotentiallyFalsyReturn<R> = PotentiallyFalsy<R> | Void

export interface WithType<T> {
  type: T
}

export interface WithLength {
  length: number
}

export interface WithValue {
  value: string
}
