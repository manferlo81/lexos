import type { Typed, Valued } from './internal/helper-types'

export type TokenType = string | number

export interface Token<T extends TokenType> extends Typed<T>, Valued {
  pos: number
}
