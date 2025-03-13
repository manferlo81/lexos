import { createGetNextToken } from './get-next-token'
import { oneOfRule } from './one-of'
import type { Rule } from './types/rule-types'
import type { Token, TokenType } from './types/token-types'
import type { Tokenizer } from './types/types'

export function createTokenizer<T extends TokenType = never>(rules: Array<Rule<T>>): Tokenizer<T> {
  const unifiedRule = oneOfRule(rules)
  // return tokenize function
  return (input: string) => {
    // initialize
    const getNextToken = createGetNextToken(input, unifiedRule, 0, null)
    const tokens: Array<Token<T>> = []

    // iterate
    for (let token = getNextToken(); token; token = getNextToken()) tokens.push(token)

    // return tokens
    return tokens
  }
}
