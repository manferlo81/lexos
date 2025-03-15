import type { Token, TokenListWithLastToken, TokenType } from '../types/token-types'
import type { GetNextToken } from '../types/types'

export function getAllTokens<T extends TokenType, L>(getNextToken: GetNextToken<T, L>): TokenListWithLastToken<T, L> {
  // initialize
  const tokens: TokenListWithLastToken<T, L> = []

  // iterate
  for (let token = getNextToken(); token; token = getNextToken()) tokens.push(token as unknown as (Token<T> | L))

  // return tokens
  return tokens
}
