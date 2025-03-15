import { createGetNextToken } from './tools/get-next-token'
import { unifyRules } from './tools/unify-rules'
import type { UnifiableRules } from './types/rule-types'
import type { TokenType } from './types/token-types'
import type { Lexer } from './types/types'

export function createLexer<T extends TokenType = never, L = never>(rules: UnifiableRules<T, L>): Lexer<T, L>
export function createLexer<T extends TokenType = never, L = never, X extends TokenType = never>(rules: UnifiableRules<T, L>, lastToken: X): Lexer<T, L | X>
export function createLexer<T extends TokenType = never, L = never, X = never>(rules: UnifiableRules<T, L>, lastToken: X): Lexer<T, L | X>
export function createLexer<T extends TokenType = never, L = never>(rules: UnifiableRules<T, L>, lastToken = null): Lexer<T, L | typeof lastToken> {
  // unify rules
  const unifiedRule = unifyRules(rules)

  // return lexer
  return (input: string) => {
    return createGetNextToken(input, unifiedRule, 0, lastToken)
  }
}
