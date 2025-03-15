import { ruleTest } from '../tests'
import type { CodeProcessingFunction, Void } from '../types/internal/helper-types'
import type { AnyTest, TestResult } from '../types/test-types'

type CreateRuleResult<R> = (result: TestResult, currentPosition: number) => R

export function createRule<R>(test: AnyTest, createResult: CreateRuleResult<R>): CodeProcessingFunction<R | Void> {

  const test_ = ruleTest(test)

  // return rule
  return (input, pos) => {
    // test code at current position
    const result = test_(input, pos)

    // return no match if test didn't match
    if (!result) return

    // callback result creator function
    return createResult(result, pos)
  }
}
