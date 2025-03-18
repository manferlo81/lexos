import type { SingleTokenRule, SingleTokenRuleResult } from '../types/single-rule-types'
import type { Test } from '../types/test-types'
import type { GetTokenType, TokenType } from '../types/token-types'
import { createRule } from './create-rule'
import { isType } from './is'

export function singleTokenRule<T extends TokenType>(type: T | GetTokenType<T>, test: Test): SingleTokenRule<T> {
  // create get type function
  const getType: GetTokenType<T> = isType(type, 'function') ? type : () => type

  // return rule
  return createRule(test, ({ length, value }): SingleTokenRuleResult<T> => {
    return { length, token: { type: getType(value), value } }
  })
}
