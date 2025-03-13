import { createGetNextToken } from './get-next-token'
import { oneOfRule } from './one-of'
import type { Rule } from './types/rule-types'
import type { TokenType } from './types/token-types'
import type { Lexer } from './types/types'

export function createLexer<T extends TokenType = never>(rules: Array<Rule<T>>): Lexer<T> {
  const unifiedRule = oneOfRule(rules)
  return (input: string) => {
    return createGetNextToken<T>(input, unifiedRule, 0, null)
  }
}
