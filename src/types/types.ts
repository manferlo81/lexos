import type { Token, TokenType } from './token-types'

export interface TokenizerResult<T extends TokenType> {
  tokens: Array<Token<T>>
  length: number
  done: boolean
}

export type Tokenizer<T extends TokenType> = (code: string) => TokenizerResult<T>
