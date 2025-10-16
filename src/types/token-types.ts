import type { Falsy, GetTokenTypeBase, WithType, WithValue } from './helper-types'

export type TokenType = string | number

export type GetTokenType<T extends TokenType> = GetTokenTypeBase<T | Falsy> & GetTokenTypeBase<void>

export interface LastToken<T extends TokenType> extends WithType<T> {
  pos: number
}

export interface Token<T extends TokenType> extends LastToken<T>, WithValue<string> {}
