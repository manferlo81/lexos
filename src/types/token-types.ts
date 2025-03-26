import type { PotentiallyFalsyReturn, WithType, WithValue } from './helper-types'
import type { GetTokenTypeBase } from './private-types'

export type TokenType = string | number

export type GetTokenType<T extends TokenType> = GetTokenTypeBase<PotentiallyFalsyReturn<T>>

export interface LastToken<T extends TokenType> extends WithType<T> {
  pos: number
}

export interface Token<T extends TokenType> extends LastToken<T>, WithValue {}

export type TokenList<T extends TokenType> = Array<Token<T>>
export type TokenListWithLastToken<T extends TokenType, L extends TokenType> = Array<Token<T> | LastToken<L>>
