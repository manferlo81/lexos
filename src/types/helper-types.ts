// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type Void = void

export type Falsy = null | undefined | false
export type FalsyReturn = Falsy | Void

export type CodeProcessingFunction<R> = (code: string, currentPosition: number) => R | FalsyReturn
