import { initTokenGenerator } from '../generator'
import { ruleTest } from '../tests/rule-test'
import { createRule } from '../tools/create-rule'
import type { MultiTokenRule } from '../types/multi-rule-types'
import type { Rule, RuleList, UnifiableRules } from '../types/rule-types'
import type { AnyTest } from '../types/test-types'
import type { TokenType } from '../types/token-types'

export function lexerRule<T extends TokenType = never, L extends TokenType = never>(test: AnyTest, rule: Rule<T, L>, lastTokenType?: L | null): MultiTokenRule<T, L>
export function lexerRule<T extends TokenType = never, L extends TokenType = never, X extends TokenType = never>(test: AnyTest, rule: Rule<T, L>, lastTokenType: X): MultiTokenRule<T, L | X>
export function lexerRule<T extends TokenType = never, L extends TokenType = never>(test: AnyTest, rules: RuleList<T, L>, lastTokenType?: L | null): MultiTokenRule<T, L>
export function lexerRule<T extends TokenType = never, L extends TokenType = never, X extends TokenType = never>(test: AnyTest, rules: RuleList<T, L>, lastTokenType: X): MultiTokenRule<T, L | X>

export function lexerRule<T extends TokenType = never, L extends TokenType = never>(test: AnyTest, unifiable: UnifiableRules<T, L>, lastTokenType?: L | null): MultiTokenRule<T, L>
export function lexerRule<T extends TokenType = never, L extends TokenType = never, X extends TokenType = never>(test: AnyTest, unifiable: UnifiableRules<T, L>, lastTokenType: X): MultiTokenRule<T, L | X>

export function lexerRule<T extends TokenType = never, L extends TokenType = never>(test: AnyTest, rules: UnifiableRules<T, L>, lastTokenType?: L | null): MultiTokenRule<T, L> {
  const createGenerator = initTokenGenerator(rules, lastTokenType)

  // return rule
  return createRule(ruleTest(test), ({ length, value }, currentPosition) => {
    const generator = createGenerator(value, currentPosition)
    return { length, generator }
  })
}
