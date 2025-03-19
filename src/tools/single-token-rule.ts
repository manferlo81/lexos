import type { CodeProcessingFunction, FalsyReturn } from '../types/helper-types'
import type { SingleTokenRule, SingleTokenRuleResult } from '../types/single-rule-types'
import type { Test, TestResult } from '../types/test-types'
import type { GetActualTokenType, GetNullishTokenType, GetTokenType, TokenType } from '../types/token-types'
import { createRule } from './create-rule'
import { isType } from './is'

export function singleTokenRule(type: GetNullishTokenType, test: Test): Test
export function singleTokenRule<T extends TokenType>(type: T | GetActualTokenType<T>, test: Test): SingleTokenRule<T>
export function singleTokenRule<T extends TokenType>(type: T | GetTokenType<T>, test: Test): SingleTokenRule<T> | Test
export function singleTokenRule<T extends TokenType>(type: T | GetTokenType<T>, test: Test): CodeProcessingFunction<SingleTokenRuleResult<T> | TestResult | FalsyReturn> {

  if (isType(type, 'function')) {
    // return dynamic type rule
    return createRule<SingleTokenRuleResult<T> | TestResult>(test, (result) => {
      const value = result.value
      const tokenType = type(value)
      if (tokenType == null || tokenType === false) return result
      return { length: result.length, token: { type: tokenType, value } }
    })
  }

  // return static type rule
  return createRule<SingleTokenRuleResult<T>>(
    test,
    (result) => ({ length: result.length, token: { type, value: result.value } }),
  )
}
