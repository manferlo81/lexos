import { createTokenGenerator } from './generator'
import { unifyRules } from './tools/unify-rules'
import type { Rule, RuleList, UnifiableRules } from './types/rule-types'
import type { TokenType } from './types/token-types'
import type { Tokenizer } from './types/types'

export function createTokenizer<T extends TokenType = never, L extends TokenType = never>(rule: Rule<T, L>, lastTokenType?: L | null): Tokenizer<T, L>
export function createTokenizer<T extends TokenType = never, L extends TokenType = never, X extends TokenType = never>(rule: Rule<T, L>, lastTokenType: X): Tokenizer<T, L | X>
export function createTokenizer<T extends TokenType = never, L extends TokenType = never>(rules: RuleList<T, L>, lastTokenType?: L | null): Tokenizer<T, L>
export function createTokenizer<T extends TokenType = never, L extends TokenType = never, X extends TokenType = never>(rules: RuleList<T, L>, lastTokenType: X): Tokenizer<T, L | X>
export function createTokenizer<T extends TokenType = never, L extends TokenType = never>(unifiable: UnifiableRules<T, L>, lastTokenType?: L | null): Tokenizer<T, L>
export function createTokenizer<T extends TokenType = never, L extends TokenType = never, X extends TokenType = never>(unifiable: UnifiableRules<T, L>, lastTokenType: X): Tokenizer<T, L | X>
export function createTokenizer<T extends TokenType = never, L extends TokenType = never>(rules: UnifiableRules<T, L>, lastTokenType: L | null = null): Tokenizer<T, L> {
  // unify rules
  const unifiedRule = unifyRules(rules)

  // return tokenize function
  return (input: string) => {
    // create generator
    const generator = createTokenGenerator(input, unifiedRule, 0, lastTokenType)

    // return all tokens
    return Array.from(generator)
  }
}
