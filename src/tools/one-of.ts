import type { CodeProcessingFunction, Void } from '../types/internal/helper-types'
import type { Rule, RuleResult } from '../types/rule-types'
import type { Test, TestResult } from '../types/test-types'
import type { TokenType } from '../types/token-types'

// FIXME: this function is unnecessary
//        I can use oneOfTest instead

export function createOneOf(rules: Test[]): CodeProcessingFunction<TestResult | Void>
export function createOneOf<T extends TokenType>(rules: Array<Rule<T>>): CodeProcessingFunction<RuleResult<T> | Void>
export function createOneOf<T extends TokenType>(rules: Array<Rule<T>>): CodeProcessingFunction<RuleResult<T> | Void> {
  return (input: string, currentPosition: number) => {
    for (const rule of rules) {
      const result = rule(input, currentPosition)
      if (result) return result
    }
  }
}
