import { createGetNextToken } from './get-next-token'
import type { Rule } from './types/rule-types'
import type { Token, TokenType } from './types/token-types'
import type { Tokenizer } from './types/types'
import { unifyRules } from './unify-rules'

export function createTokenizer<T extends TokenType = never>(rules: Rule<T> | Array<Rule<T>>): Tokenizer<T> {
  // unify rules
  const unifiedRule = unifyRules(rules)

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
