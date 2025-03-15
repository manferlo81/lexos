import type { CodeProcessingFunction, FalsyReturn } from './types/internal/helper-types'
import type { Rule, RuleResult } from './types/rule-types'
import type { Test } from './types/test-types'
import type { TokenType } from './types/token-types'

export function createOneOf(rules: Test[]): Test
export function createOneOf<T extends TokenType>(rules: Array<Rule<T>>): Rule<T>
export function createOneOf<T extends TokenType>(rules: Array<Rule<T>>): CodeProcessingFunction<RuleResult<T> | FalsyReturn> {

  // return first rule if only one provided
  if (rules.length === 1) return rules[0]

  // return composite rule
  return (input: string, pos: number) => {
    for (const rule of rules) {
      const result = rule(input, pos)
      if (result) return result
    }
  }
}
