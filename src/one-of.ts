import type { CodeProcessingFunction, FalsyReturn } from './types/internal/helper-types'
import type { Rule, RuleList, RuleResult } from './types/rule-types'
import type { Test } from './types/test-types'
import type { TokenType } from './types/token-types'

export function createOneOf(rules: Test[]): Test
export function createOneOf<T extends TokenType = never, L extends TokenType = never>(rules: RuleList<T, L>): Rule<T, L>
export function createOneOf<T extends TokenType, L extends TokenType>(rules: RuleList<T, L>): CodeProcessingFunction<RuleResult<T, L> | FalsyReturn> {

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

export function oneOf<T extends Test>(rules: T[]): T
export function oneOf<T extends Rule<never, never> | Test>(rules: T[]): T
export function oneOf<T extends TokenType, L extends TokenType>(rules: RuleList<T, L>): CodeProcessingFunction<RuleResult<T, L> | FalsyReturn> {

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
