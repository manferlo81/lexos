import { getAllTokens } from './tools/get-all-tokens'
import { createGetNextToken } from './tools/get-next-token'
import { unifyRules } from './tools/unify-rules'
import type { Rule } from './types/rule-types'
import type { TokenType } from './types/token-types'
import type { Tokenizer } from './types/types'

export function createTokenizer<T extends TokenType = never>(rules: Rule<T> | Array<Rule<T>>): Tokenizer<T> {
  // unify rules
  const unifiedRule = unifyRules(rules)

  // return tokenize function
  return (input: string) => {
    // initialize
    const getNextToken = createGetNextToken(input, unifiedRule, 0, null)

    // get all tokens
    return getAllTokens(getNextToken)
  }
}
