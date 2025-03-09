import type { Typed, Valuable } from './helper-types'

export type TokenType = string | number

export interface Token<T extends TokenType> extends Typed<T>, Valuable {
  pos: number
}

export type TokenList<T extends TokenType> = Array<Token<T>>
