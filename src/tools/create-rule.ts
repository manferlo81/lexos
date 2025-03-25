import type { CodeProcessingFunction, PotentiallyFalsy } from '../types/helper-types'
import type { Test } from '../types/test-types'
import type { ValueTestResult } from '../types/value-test-types'
import { isType } from './is'

type CreateRuleResult<R> = (result: ValueTestResult, pos: number) => R

export function createRule<R>(test: Test, createResult: CreateRuleResult<R>): CodeProcessingFunction<PotentiallyFalsy<R>> {

  // return rule
  return (input, pos) => {
    // test code at current position
    const result = test(input, pos)

    // return no match if test didn't match
    if (!result) return

    // callback result creator function with value result
    if (!isType(result, 'number')) return createResult(result, pos)

    // callback result creator function with value result from length
    return createResult(
      {
        length: result,
        value: input.slice(pos, pos + result),
      },
      pos,
    )

  }
}
