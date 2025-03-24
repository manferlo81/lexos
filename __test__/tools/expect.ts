import type { LastToken, SingleTokenRuleResult, Token, TokenType, ValueTestResult } from '../../src'
import { createSingleTokenResult, createTestResult } from './create'

export const expectFunction = (): unknown => expect.any(Function)

export const expectGenerator = (): unknown => expect.objectContaining({
  next: expectFunction(),
})

export function expectTestResult(value: string): ValueTestResult {
  return createTestResult(value)
}

export function expectSingleTokenResult<T extends TokenType>(value: string, type: T): SingleTokenRuleResult<T> {
  return createSingleTokenResult(value, type)
}

export function expectMultiTokenResult(length: number) {
  return {
    length,
    generator: expectGenerator(),
  }
}

export function expectToken<T extends TokenType>(type: T, pos: number, value?: ''): LastToken<T>
export function expectToken<T extends TokenType>(type: T, pos: number, value: string): Token<T>
export function expectToken<T extends TokenType>(type: T, pos: number, value?: string): LastToken<T> | Token<T> {
  const lastToken: LastToken<T> = { type, pos }
  if (!value) return lastToken
  const token: Token<T> = { ...lastToken, value }
  return token
}
