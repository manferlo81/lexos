import type { Typed, Valued } from './internal/helper-types'

export type TokenType = string | number

export type GetTokenType<T extends TokenType> = (value: string) => T

export interface LastToken<T extends TokenType> extends Typed<T> {
  pos: number
}

export interface Token<T extends TokenType> extends LastToken<T>, Valued {}

export type TokenList<T extends TokenType> = Array<Token<T>>
export type TokenListWithLastToken<T extends TokenType, L extends TokenType> = Array<Token<T> | LastToken<L>>
