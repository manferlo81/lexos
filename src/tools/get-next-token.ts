import type { TokenType } from '../types/token-types'
import type { GetNextToken, TokenGenerator } from '../types/types'

export function createGetNextToken<T extends TokenType = never, L extends TokenType = never>(generator: TokenGenerator<T, L>): GetNextToken<T, L> {
  return () => {
    const result = generator.next()
    if (result.done) return null
    return result.value
  }
}
