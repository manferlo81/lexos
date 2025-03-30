import type { InitializerFunction, Void } from './helper-types'
import type { LastToken, Token, TokenType } from './token-types'

export type TokenGenerator<T extends TokenType, L extends TokenType> = Generator<Token<T> | LastToken<L>, Void, Void>
export type CreateTokenGenerator<T extends TokenType, L extends TokenType> = InitializerFunction<TokenGenerator<T, L>>
