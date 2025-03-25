import type { AnySingleTokenRuleOrTest, GetActualTokenType, GetNullishTokenType, SingleTokenRuleOrTest, SingleTokenRuleOrTestResult } from '../types/private-types'
import type { SingleTokenRule, SingleTokenRuleResult } from '../types/rule-single-types'
import type { Test } from '../types/test-types'
import type { ValueTest } from '../types/test-value-types'
import type { GetTokenType, TokenType } from '../types/token-types'
import { createRule } from './create-rule'
import { isType } from './is'

export function singleTokenRule(type: GetNullishTokenType, test: Test): ValueTest
export function singleTokenRule<T extends TokenType>(type: T | GetActualTokenType<T>, test: Test): SingleTokenRule<T>
export function singleTokenRule<T extends TokenType>(type: T | GetTokenType<T>, test: Test): SingleTokenRuleOrTest<T>
export function singleTokenRule<T extends TokenType>(type: T | GetTokenType<T>, test: Test): AnySingleTokenRuleOrTest<T> {

  if (isType(type, 'function')) {
    // return dynamic type rule
    return createRule<SingleTokenRuleOrTestResult<T>>(test, (result) => {
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
