import type { CodeProcessingFunction, FalsyReturn, Nullish, Void } from '../types/helper-types'
import type { SingleTokenRuleResult } from '../types/single-rule-types'
import type { Test, TestResult } from '../types/test-types'
import type { GetTokenType, TokenType } from '../types/token-types'
import { createRule } from './create-rule'
import { isType } from './is'

export function singleTokenRule<T extends TokenType>(type: T, test: Test): CodeProcessingFunction<SingleTokenRuleResult<T> | Void>
export function singleTokenRule(type: (value: string) => Nullish, test: Test): CodeProcessingFunction<TestResult | Void>
export function singleTokenRule<T extends TokenType>(type: T | GetTokenType<T>, test: Test): CodeProcessingFunction<SingleTokenRuleResult<T> | TestResult | FalsyReturn>
export function singleTokenRule<T extends TokenType>(type: T | GetTokenType<T>, test: Test): CodeProcessingFunction<SingleTokenRuleResult<T> | TestResult | FalsyReturn> {
  // create get type function
  const getType: GetTokenType<T> = isType(type, 'function') ? type : () => type

  // return rule
  return createRule(test, (result): SingleTokenRuleResult<T> | TestResult => {
    const { length, value } = result
    const type = getType(value)
    if (type == null || type === false) return result
    return { length, token: { type, value } }
  })
}
