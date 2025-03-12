import { createGetNextToken } from './get-next-token'
import type { Rule } from './types/rule-types'
import type { Token, TokenType } from './types/token-types'
import type { Tokenizer } from './types/types'

export function createTokenizer<T extends TokenType = never>(rules: Array<Rule<T>>): Tokenizer<T> {
  // return tokenize function
  return (input: string) => {
    // initialize
    const getNextToken = createGetNextToken(input, rules, 0)
    const tokens: Array<Token<T>> = []

    // iterate
    for (let token = getNextToken(); token; token = getNextToken()) tokens.push(token)

    // return tokens
    return tokens
  }
}
