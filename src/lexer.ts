import { createGetNextToken } from './get-next-token'
import type { Rule } from './types/rule-types'
import type { TokenType } from './types/token-types'
import type { Lexer } from './types/types'
import { unifyRules } from './unify-rules'

export function createLexer<T extends TokenType = never>(rules: Rule<T> | Array<Rule<T>>): Lexer<T> {
  // unify rules
  const unifiedRule = unifyRules(rules)

  // return lexer
  return (input: string) => {
    return createGetNextToken<T>(input, unifiedRule, 0, null)
  }
}
