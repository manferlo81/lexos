import type { Void } from './types/helper-types'
import type { RuleList } from './types/rule-types'
import type { Test, TestResult } from './types/test-types'
import type { TokenType } from './types/token-types'
import type { TokenizerResult } from './types/types'

export function getFirstTruthyResult(tests: Test[], code: string, pos: number): TestResult | Void
export function getFirstTruthyResult<T extends TokenType>(tests: RuleList<T>, code: string, pos: number): TokenizerResult<T> | TestResult | Void
export function getFirstTruthyResult<T extends TokenType>(tests: RuleList<T>, code: string, pos: number): TestResult | TokenizerResult<T> | Void {
  const partial = code.substring(pos)
  for (const test of tests) {
    const result = test(partial)
    if (result) return result
  }
}
