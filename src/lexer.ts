import { initTokenGenerator } from './generator'
import { createGetNextToken } from './tools/get-next-token'
import type { Falsy, PotentiallyFalsy } from './types/helper-types'
import type { UnifiableRules } from './types/rule-types'
import type { TokenType } from './types/token-types'
import type { Lexer } from './types/types'

export function createLexer<T extends TokenType = never, L extends TokenType = never>(rules: UnifiableRules<T, L>, lastTokenType?: Falsy): Lexer<T, L>
export function createLexer<T extends TokenType = never, L extends TokenType = never, X extends TokenType = never>(rules: UnifiableRules<T, L>, lastTokenType: X): Lexer<T, L | X>

export function createLexer<T extends TokenType = never, L extends TokenType = never>(rules: UnifiableRules<T, L>, lastTokenType: PotentiallyFalsy<L>): Lexer<T, L>
export function createLexer<T extends TokenType = never, L extends TokenType = never>(rules: UnifiableRules<T, L>, lastTokenType?: L | null): Lexer<T, L> {
  // initialize token generator
  const createGenerator = initTokenGenerator(rules, lastTokenType)

  // return lexer
  return (input, offset) => {
    // create token generator
    const generator = createGenerator(input, offset)

    // return get next token function
    return createGetNextToken(generator)
  }
}
