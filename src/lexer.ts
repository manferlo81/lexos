import { createGetNextToken } from './get-next-token'
import type { Rule } from './types/rule-types'
import type { TokenType } from './types/token-types'
import type { Lexer } from './types/types'

export function createLexer<T extends TokenType = never>(rules: Array<Rule<T>>): Lexer<T> {
  return (input: string) => {
    return createGetNextToken<T>(input, rules, 0)
  }
}
