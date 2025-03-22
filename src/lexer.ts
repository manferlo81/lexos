import { initTokenGenerator } from './generator'
import { createGetNextToken } from './tools/get-next-token'
import type { Rule, RuleList, UnifiableRules } from './types/rule-types'
import type { TokenType } from './types/token-types'
import type { Lexer } from './types/types'

export function createLexer<T extends TokenType = never, L extends TokenType = never>(rule: Rule<T, L>, lastTokenType?: L | null): Lexer<T, L>
export function createLexer<T extends TokenType = never, L extends TokenType = never, X extends TokenType = never>(rule: Rule<T, L>, lastTokenType: X): Lexer<T, L | X>
export function createLexer<T extends TokenType = never, L extends TokenType = never>(rules: RuleList<T, L>, lastTokenType?: L | null): Lexer<T, L>
export function createLexer<T extends TokenType = never, L extends TokenType = never, X extends TokenType = never>(rules: RuleList<T, L>, lastTokenType: X): Lexer<T, L | X>

export function createLexer<T extends TokenType = never, L extends TokenType = never>(unifiable: UnifiableRules<T, L>, lastTokenType?: L | null): Lexer<T, L>
export function createLexer<T extends TokenType = never, L extends TokenType = never, X extends TokenType = never>(unifiable: UnifiableRules<T, L>, lastTokenType: X): Lexer<T, L | X>

export function createLexer<T extends TokenType = never, L extends TokenType = never>(rules: UnifiableRules<T, L>, lastTokenType?: L | null): Lexer<T, L> {
  const createGenerator = initTokenGenerator(rules, lastTokenType)

  // return lexer
  return (input) => {
    // create generator
    const generator = createGenerator(input, 0)

    // return get next token function
    return createGetNextToken(generator)
  }
}
