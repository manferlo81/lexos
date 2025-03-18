import { type NullishReturn, type Typed, type Valued } from './helper-types'

export type TokenType = string | number

type GetTokenTypeBase<R> = (value: string) => R

export type GetActualTokenType<T extends TokenType> = GetTokenTypeBase<T>
export type GetNullishTokenType = GetTokenTypeBase<NullishReturn>
export type GetTokenType<T extends TokenType> = GetTokenTypeBase<T | NullishReturn>

export interface LastToken<T extends TokenType> extends Typed<T> {
  pos: number
}

export interface Token<T extends TokenType> extends LastToken<T>, Valued {}

export type TokenList<T extends TokenType> = Array<Token<T>>
export type TokenListWithLastToken<T extends TokenType, L extends TokenType> = Array<Token<T> | LastToken<L>>
