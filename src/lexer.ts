import { createGetNextToken } from './tools/get-next-token'
import { unifyRules } from './tools/unify-rules'
import type { Rule } from './types/rule-types'
import type { TokenType } from './types/token-types'
import type { Lexer } from './types/types'

export function createLexer<T extends TokenType = never>(rules: Rule<T> | Array<Rule<T>>): Lexer<T> {
  // unify rules
  const unifiedRule = unifyRules(rules)

  // return lexer
  return (input: string) => {
    return createGetNextToken<T>(input, unifiedRule, 0, null)
  }
}
