import type { Token, TokenType } from './token-types'

export type GetNextTokenResult<T extends TokenType> = Token<T> | null
export type GetNextToken<T extends TokenType> = () => GetNextTokenResult<T>

export type Lexer<T extends TokenType> = (input: string) => GetNextToken<T>
export type Tokenizer<T extends TokenType> = (input: string) => Array<Token<T>>
