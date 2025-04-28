import type { LengthTestList, MultiTokenRuleList, SingleTokenRuleList, TestList, ValueTestList } from '../types/private-types'
import type { MultiTokenRule } from '../types/rule-multi-types'
import type { SingleTokenRule } from '../types/rule-single-types'
import type { Rule, RuleList } from '../types/rule-types'
import type { LengthTest } from '../types/test-length-types'
import type { Test } from '../types/test-types'
import type { ValueTest } from '../types/test-value-types'
import type { TokenType } from '../types/token-types'

export function oneOf(tests: LengthTestList): LengthTest
export function oneOf(tests: ValueTestList): ValueTest
export function oneOf(tests: TestList): Test

export function oneOf<T extends TokenType = never>(rules: SingleTokenRuleList<T>): SingleTokenRule<T>
export function oneOf<T extends TokenType = never, L extends TokenType = never>(rules: MultiTokenRuleList<T, L>): MultiTokenRule<T, L>

export function oneOf<T extends TokenType = never, L extends TokenType = never>(rules: RuleList<T, L>): Rule<T, L>
export function oneOf<T extends TokenType = never, L extends TokenType = never>(rules: RuleList<T, L>): Rule<T, L> {

  // return first rule if only one provided
  if (rules.length === 1) return rules[0]

  // return composite rule
  return (input, pos) => {
    for (const rule of rules) {
      const result = rule(input, pos)
      if (result) return result
    }
  }
}
