import { ruleTest } from './tests'
import { createRule } from './tools/create-rule'
import { createGetNextToken } from './tools/get-next-token'
import { unifyRules } from './tools/unify-rules'
import type { MultiTokenRule, Rule, RuleList, UnifiableRules } from './types/rule-types'
import type { AnyTest } from './types/test-types'
import type { TokenType } from './types/token-types'

export function lexerRule<T extends TokenType = never, L extends TokenType = never>(test: AnyTest, rule: Rule<T, L>, lastTokenType?: L | null): MultiTokenRule<T, L>
export function lexerRule<T extends TokenType = never, L extends TokenType = never, X extends TokenType = never>(test: AnyTest, rule: Rule<T, L>, lastTokenType: X): MultiTokenRule<T, L | X>
export function lexerRule<T extends TokenType = never, L extends TokenType = never>(test: AnyTest, rules: RuleList<T, L>, lastTokenType?: L | null): MultiTokenRule<T, L>
export function lexerRule<T extends TokenType = never, L extends TokenType = never, X extends TokenType = never>(test: AnyTest, rules: RuleList<T, L>, lastTokenType: X): MultiTokenRule<T, L | X>
export function lexerRule<T extends TokenType = never, L extends TokenType = never>(test: AnyTest, unifiable: UnifiableRules<T, L>, lastTokenType?: L | null): MultiTokenRule<T, L>
export function lexerRule<T extends TokenType = never, L extends TokenType = never, X extends TokenType = never>(test: AnyTest, unifiable: UnifiableRules<T, L>, lastTokenType: X): MultiTokenRule<T, L | X>
export function lexerRule<T extends TokenType = never, L extends TokenType = never>(test: AnyTest, rules: UnifiableRules<T, L>, lastTokenType: L | null = null): MultiTokenRule<T, L> {
  // unify rules
  const unifiedRule = unifyRules(rules)

  // return rule
  return createRule(ruleTest(test), ({ length, value }, currentPosition) => {
    const getToken = createGetNextToken(value, unifiedRule, currentPosition, lastTokenType)
    return { length, getToken }
  })
}
