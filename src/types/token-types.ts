import type { FalsyReturn, GetTokenTypeBase, WithType, WithValue } from './helper-types'

export type TokenType = string | number

export type GetActualTokenType<T extends TokenType> = GetTokenTypeBase<T>
export type GetNullishTokenType = GetTokenTypeBase<FalsyReturn>

export type GetTokenType<T extends TokenType> = GetTokenTypeBase<T | FalsyReturn>

export interface LastToken<T extends TokenType> extends WithType<T> {
  pos: number
}

export interface Token<T extends TokenType> extends LastToken<T>, WithValue {}

export type TokenList<T extends TokenType> = Array<Token<T>>
export type TokenListWithLastToken<T extends TokenType, L extends TokenType> = Array<Token<T> | LastToken<L>>
