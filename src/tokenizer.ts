import { getAllTokens } from './tools/get-all-tokens'
import { createGetNextToken } from './tools/get-next-token'
import { unifyRules } from './tools/unify-rules'
import type { UnifiableRules } from './types/rule-types'
import type { TokenType } from './types/token-types'
import type { Tokenizer } from './types/types'

export function createTokenizer<T extends TokenType = never, L extends TokenType = never>(rules: UnifiableRules<T, L>, lastTokenType?: L | null): Tokenizer<T, L>
export function createTokenizer<T extends TokenType = never, L extends TokenType = never, X extends TokenType = never>(rules: UnifiableRules<T, L>, lastTokenType: X): Tokenizer<T, L | X>
export function createTokenizer<T extends TokenType = never, L extends TokenType = never>(rules: UnifiableRules<T, L>, lastTokenType: L | null = null): Tokenizer<T, L> {
  // unify rules
  const unifiedRule = unifyRules(rules)

  // return tokenize function
  return (input: string) => {
    // initialize
    const getNextToken = createGetNextToken(input, unifiedRule, 0, lastTokenType)

    // get all tokens
    return getAllTokens(getNextToken)
  }
}
