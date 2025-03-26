import type { Void } from './helper-types'
import type { InitializerFunction } from './private-types'
import type { LastToken, Token, TokenListWithLastToken, TokenType } from './token-types'

export type TokenGenerator<T extends TokenType, L extends TokenType> = Generator<Token<T> | LastToken<L>, Void, Void>
export type CreateTokenGenerator<T extends TokenType, L extends TokenType> = InitializerFunction<TokenGenerator<T, L>>

export type GetNextTokenResult<T extends TokenType, L extends TokenType> = Token<T> | LastToken<L> | null
export type GetNextToken<T extends TokenType, L extends TokenType> = () => GetNextTokenResult<T, L>

export type Lexer<T extends TokenType, L extends TokenType> = InitializerFunction<GetNextToken<T, L>>
export type Tokenizer<T extends TokenType, L extends TokenType> = InitializerFunction<TokenListWithLastToken<T, L>>
