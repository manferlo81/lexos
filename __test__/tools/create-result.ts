import type { SingleTokenRuleResult, TestResult, TokenType } from '../../src'

export function expectedTestResult(value: string): TestResult {
  return {
    length: value.length,
    value,
  }
}

export function expectedTokenResult<T extends TokenType>(value: string, type: T): SingleTokenRuleResult<T> {
  return {
    length: value.length,
    token: { type, value },
  }
}
