import { getAllTokens } from './tools/get-all-tokens'
import { createGetNextToken } from './tools/get-next-token'
import { unifyRules } from './tools/unify-rules'
import type { UnifiableRules } from './types/rule-types'
import type { TokenType } from './types/token-types'
import type { Tokenizer } from './types/types'

export function createTokenizer<T extends TokenType = never, L = never>(rules: UnifiableRules<T, L>): Tokenizer<T, L>
export function createTokenizer<T extends TokenType = never, L = never, X extends TokenType = never>(rules: UnifiableRules<T, L>, lastToken: X): Tokenizer<T, L | X>
export function createTokenizer<T extends TokenType = never, L = never, X = never>(rules: UnifiableRules<T, L>, lastToken: X): Tokenizer<T, L | X>
export function createTokenizer<T extends TokenType = never, L = never>(rules: UnifiableRules<T, L>, lastToken = null): Tokenizer<T, L | typeof lastToken> {
  // unify rules
  const unifiedRule = unifyRules(rules)

  // return tokenize function
  return (input: string) => {
    // initialize
    const getNextToken = createGetNextToken(input, unifiedRule, 0, lastToken)

    // get all tokens
    return getAllTokens(getNextToken)
  }
}
