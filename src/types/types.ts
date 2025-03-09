import type { Lengthy } from './helper-types'
import type { TokenList, TokenType } from './token-types'

export interface TokenizerResult<T extends TokenType> extends Lengthy {
  tokens: TokenList<T>
  done: boolean
}

export type Tokenizer<T extends TokenType> = (code: string) => TokenizerResult<T>
