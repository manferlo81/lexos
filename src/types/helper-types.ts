// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type Void = void

export type Falsy = null | undefined | false
export type FalsyReturn = Falsy | Void

export interface Typed<T> {
  type: T
}

export interface Lengthy {
  length: number
}

export interface Valuable {
  value: string
}

export type CodeProcessingFunction<R> = (code: string, currentPosition: number) => R | FalsyReturn

export type List<T> = [first: T, ...more: T[]]
export type MultiList<T> = [first: T, second: T, ...more: T[]]
