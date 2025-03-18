import type { CodeProcessingFunction, FalsyReturn } from '../types/helper-types'
import type { Test, TestResult } from '../types/test-types'

type CreateRuleResult<R> = (result: TestResult, pos: number) => R

export function createRule<R>(test: Test, createResult: CreateRuleResult<R>): CodeProcessingFunction<R | FalsyReturn> {

  // return rule
  return (input, pos) => {
    // test code at current position
    const result = test(input, pos)

    // callback result creator function
    if (result) return createResult(result, pos)

    // return no match if test didn't match
  }
}
