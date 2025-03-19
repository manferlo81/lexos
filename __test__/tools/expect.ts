import type { LastToken, SingleTokenRuleResult, TestResult, Token, TokenType } from '../../src'

export const expectFunction = (): unknown => expect.any(Function)

export const expectGenerator = (): unknown => expect.objectContaining({
  next: expectFunction(),
})

export function expectTestResult(value: string): TestResult {
  return {
    length: value.length,
    value,
  }
}

export function expectSingleTokenResult<T extends TokenType>(value: string, type: T): SingleTokenRuleResult<T> {
  return {
    length: value.length,
    token: { type, value },
  }
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
