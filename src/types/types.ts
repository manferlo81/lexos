import type { Token, TokenType } from './token-types'

export type GetNextToken<T extends TokenType> = () => Token<T> | null

export type Lexer<T extends TokenType> = (input: string) => GetNextToken<T>
export type Tokenizer<T extends TokenType> = (input: string) => Array<Token<T>>
