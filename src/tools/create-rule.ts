import type { CodeProcessingFunction, Void } from '../types/internal/helper-types'
import type { SingleTokenRuleResult } from '../types/rule-types'
import type { Test, TestResult } from '../types/test-types'
import type { TokenType } from '../types/token-types'

type CreateRuleResult<R> = (result: TestResult, pos: number) => R

export function createRule<R>(test: Test, createResult: CreateRuleResult<R>): CodeProcessingFunction<R | Void> {

  // return rule
  return (input, pos) => {
    // test code at current position
    const result = test(input, pos)

    // return no match if test didn't match
    if (!result) return

    // callback result creator function
    return createResult(result, pos)
  }
}

export function singleTokenRule<T extends TokenType>(type: T, test: Test) {
  return createRule(test, ({ length, value }): SingleTokenRuleResult<T> => {
    return { length, token: { type, value } }
  })
}
