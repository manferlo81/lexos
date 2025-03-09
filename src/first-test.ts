import type { Void } from './types/helper-types'
import type { AnyRuleResult, RuleList } from './types/rule-types'
import type { TestList, TestResult } from './types/test-types'
import type { TokenType } from './types/token-types'

export function getFirstTruthyResult(tests: TestList, code: string, pos: number): TestResult | Void
export function getFirstTruthyResult<T extends TokenType>(tests: RuleList<T>, code: string, pos: number): AnyRuleResult<T> | Void
export function getFirstTruthyResult<T extends TokenType>(tests: RuleList<T>, code: string, pos: number): AnyRuleResult<T> | Void {
  for (const test of tests) {
    const result = test(code, pos)
    if (result) return result
  }
}
