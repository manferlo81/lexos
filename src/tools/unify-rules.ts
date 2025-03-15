import { createOneOf } from '../one-of'
import type { Rule, UnifiableRules } from '../types/rule-types'
import type { TokenType } from '../types/token-types'
import { isType } from './is'

export function unifyRules<T extends TokenType = never, L = never>(rules: UnifiableRules<T, L>): Rule<T, L> {
  if (isType(rules, 'function')) return rules
  return createOneOf(rules)
}
