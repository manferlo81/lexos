import { initTokenGenerator } from '../main/generator'
import { ruleTest } from '../tests/rule-test'
import { createRule } from '../tools/create-rule'
import type { Falsy, PotentiallyFalsy } from '../types/helper-types'
import type { MultiTokenRule, MultiTokenRuleNoLastToken } from '../types/rule-multi-types'
import type { Rule, RuleList, UnifiableRules } from '../types/rule-types'
import type { AnyTest } from '../types/test-types'
import type { TokenType } from '../types/token-types'

export function lexerRule<T extends TokenType = never>(test: AnyTest, rule: Rule<T, never>, lastTokenType?: Falsy): MultiTokenRuleNoLastToken<T>
export function lexerRule<T extends TokenType = never, L extends TokenType = never>(test: AnyTest, rule: Rule<T, L>, lastTokenType?: Falsy): MultiTokenRule<T, L>
export function lexerRule<T extends TokenType = never, L extends TokenType = never>(test: AnyTest, rule: Rule<T, L>, lastTokenType: L): MultiTokenRule<T, L>

export function lexerRule<T extends TokenType = never>(test: AnyTest, rules: RuleList<T, never>, lastTokenType?: Falsy): MultiTokenRuleNoLastToken<T>
export function lexerRule<T extends TokenType = never, L extends TokenType = never>(test: AnyTest, rules: RuleList<T, L>, lastTokenType?: Falsy): MultiTokenRule<T, L>
export function lexerRule<T extends TokenType = never, L extends TokenType = never>(test: AnyTest, rules: RuleList<T, L>, lastTokenType: L): MultiTokenRule<T, L>

export function lexerRule<T extends TokenType = never, L extends TokenType = never>(test: AnyTest, rules: UnifiableRules<T, L>, lastTokenType?: PotentiallyFalsy<L>): MultiTokenRule<T, L>
export function lexerRule<T extends TokenType = never, L extends TokenType = never>(test: AnyTest, rules: UnifiableRules<T, L>, lastTokenType?: PotentiallyFalsy<L>): MultiTokenRule<T, L> {
  // initialize generator
  const createGenerator = initTokenGenerator(rules, lastTokenType)

  // return rule
  return createRule(ruleTest(test), ({ length, value }, currentPosition) => {
    const generator = createGenerator(value, currentPosition)
    return { length, generator }
  })
}
