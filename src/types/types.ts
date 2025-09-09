import type { InitializerFunction, Void } from './helper-types'
import type { LastToken, Token, TokenType } from './token-types'

type TokenGeneratorBase<T extends object> = Generator<T, Void, Void>

export type TokenGenerator<T extends TokenType, L extends TokenType> = TokenGeneratorBase<Token<T> | LastToken<L>>
export type TokenGeneratorNoLastToken<T extends TokenType> = TokenGeneratorBase<Token<T>>

export type CreateTokenGenerator<T extends TokenType, L extends TokenType> = InitializerFunction<TokenGenerator<T, L>>
export type CreateTokenGeneratorNoLastToken<T extends TokenType> = InitializerFunction<TokenGeneratorNoLastToken<T>>
