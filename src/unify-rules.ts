import { createOneOf } from './one-of'
import { isType } from './tools/is'
import type { Rule } from './types/rule-types'
import type { TokenType } from './types/token-types'

export function unifyRules<T extends TokenType>(rules: Rule<T> | Array<Rule<T>>): Rule<T> {
  if (isType(rules, 'function')) return rules
  return createOneOf(rules)
}
