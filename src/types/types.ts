import type { Token, TokenListWithLastToken, TokenType } from './token-types'

export type GetNextTokenResult<T extends TokenType, L> = Token<T> | L | null
export type GetNextToken<T extends TokenType, L> = () => GetNextTokenResult<T, L>

export type Lexer<T extends TokenType, L> = (input: string) => GetNextToken<T, L>
export type Tokenizer<T extends TokenType, L> = (input: string) => TokenListWithLastToken<T, L>
