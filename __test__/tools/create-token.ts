import type { LastToken, Token, TokenType } from '../../src/types/token-types'

export function createToken<T extends TokenType>(type: T, pos: number): LastToken<T>
export function createToken<T extends TokenType>(type: T, pos: number, value: string): Token<T>
export function createToken<T extends TokenType>(type: T, pos: number, value?: string): LastToken<T> | Token<T> {
  const token: LastToken<T> = { type, pos }
  if (!value) return token
  return { ...token, value }
}
