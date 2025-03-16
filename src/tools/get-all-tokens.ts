import type { TokenListWithLastToken, TokenType } from '../types/token-types'
import type { GetNextToken } from '../types/types'

export function getAllTokens<T extends TokenType, L extends TokenType>(getNextToken: GetNextToken<T, L>): TokenListWithLastToken<T, L> {
  // initialize
  const tokens: TokenListWithLastToken<T, L> = []

  // populate token list
  for (let token = getNextToken(); token; token = getNextToken()) tokens.push(token)

  // return tokens
  return tokens
}
