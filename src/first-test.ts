import type { Void } from './types/helper-types'
import type { RuleList, RuleOrTestResult } from './types/rule-types'
import type { Test, TestResult } from './types/test-types'
import type { TokenType } from './types/token-types'

export function getFirstTruthyResult(tests: Test[], code: string, pos: number): TestResult | Void
export function getFirstTruthyResult<T extends TokenType>(tests: RuleList<T>, code: string, pos: number): RuleOrTestResult<T> | Void
export function getFirstTruthyResult<T extends TokenType>(tests: RuleList<T>, code: string, pos: number): RuleOrTestResult<T> | Void {
  for (const test of tests) {
    const result = test(code, pos)
    if (result) return result
  }
}
