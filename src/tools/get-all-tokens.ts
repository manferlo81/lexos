import type { TokenList, TokenType } from '../types/token-types'
import type { GetNextToken } from '../types/types'

export function getAllTokens<T extends TokenType>(getNextToken: GetNextToken<T>): TokenList<T> {
  // initialize
  const tokens: TokenList<T> = []

  // iterate
  for (let token = getNextToken(); token; token = getNextToken()) tokens.push(token)

  // return tokens
  return tokens
}
