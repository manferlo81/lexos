import type { SingleTokenRuleResult, TestResult, TokenType } from '../../src'

export function createTestResult(value: string): TestResult {
  const length = value.length
  return { length, value }
}

export function createSingleTokenResult<T extends TokenType>(value: string, type: T): SingleTokenRuleResult<T> {
  const length = value.length
  return { length, token: { type, value } }
}
