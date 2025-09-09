import type { GetTokenTypeBase, PotentiallyFalsyReturn, WithType, WithValue } from './helper-types'

export type TokenType = string | number

export type GetTokenType<T extends TokenType> = GetTokenTypeBase<PotentiallyFalsyReturn<T>>

export interface LastToken<T extends TokenType> extends WithType<T> {
  pos: number
}

export interface Token<T extends TokenType> extends LastToken<T>, WithValue<string> {}
