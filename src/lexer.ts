import { createGetNextToken } from './tools/get-next-token'
import { unifyRules } from './tools/unify-rules'
import type { UnifiableRules } from './types/rule-types'
import type { TokenType } from './types/token-types'
import type { Lexer } from './types/types'

export function createLexer<T extends TokenType = never, L extends TokenType = never>(rules: UnifiableRules<T, L>, lastTokenType?: L | null): Lexer<T, L>
export function createLexer<T extends TokenType = never, L extends TokenType = never, X extends TokenType = never>(rules: UnifiableRules<T, L>, lastTokenType: X): Lexer<T, L | X>
export function createLexer<T extends TokenType = never, L extends TokenType = never>(rules: UnifiableRules<T, L>, lastTokenType: L | null = null): Lexer<T, L> {
  // unify rules
  const unifiedRule = unifyRules(rules)

  // return lexer
  return (input: string) => {
    return createGetNextToken(input, unifiedRule, 0, lastTokenType)
  }
}
