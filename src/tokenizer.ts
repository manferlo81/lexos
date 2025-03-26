import { initTokenGenerator } from './generator'
import type { Falsy, PotentiallyFalsy } from './types/helper-types'
import type { UnifiableRules } from './types/rule-types'
import type { TokenType } from './types/token-types'
import type { Tokenizer } from './types/types'

export function createTokenizer<T extends TokenType = never, L extends TokenType = never>(rules: UnifiableRules<T, L>, lastTokenType?: Falsy): Tokenizer<T, L>
export function createTokenizer<T extends TokenType = never, L extends TokenType = never, X extends TokenType = never>(rules: UnifiableRules<T, L>, lastTokenType: X): Tokenizer<T, L | X>

export function createTokenizer<T extends TokenType = never, L extends TokenType = never>(rules: UnifiableRules<T, L>, lastTokenType: PotentiallyFalsy<L>): Tokenizer<T, L>
export function createTokenizer<T extends TokenType = never, L extends TokenType = never>(rules: UnifiableRules<T, L>, lastTokenType?: PotentiallyFalsy<L>): Tokenizer<T, L> {
  // initialize token generator
  const createGenerator = initTokenGenerator(rules, lastTokenType)

  // return tokenize function
  return (input, offset) => {
    // create token generator
    const generator = createGenerator(input, offset)

    // return token array
    return Array.from(generator)
  }
}
