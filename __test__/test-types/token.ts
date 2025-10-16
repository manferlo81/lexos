import type { CreateTokenGenerator, GetTokenType, LastToken, Token, TokenGenerator, TokenType } from '../../src'
import type { And, Equals, Expect, Extends, ObjectPropertyEquals } from './types-test-tools'

export type Results = And<[
  Expect<Equals<CreateTokenGenerator<TokenType, TokenType>, (input: string, offset?: number) => TokenGenerator<TokenType, TokenType>>>,
  Expect<Equals<CreateTokenGenerator<'T', 'L'>, (input: string, offset?: number) => TokenGenerator<'T', 'L'>>>,

  Expect<Equals<TokenGenerator<TokenType, TokenType>, Generator<Token<TokenType> | LastToken<TokenType>, void, void>>>,
  Expect<Equals<TokenGenerator<'A', 'B'>, Generator<Token<'A'> | LastToken<'B'>, void, void>>>,

  Expect<Equals<GetTokenType<TokenType>, (value: string) => TokenType | false | null | undefined>>,
  Expect<Equals<TokenType, string | number>>,

  Expect<Extends<Token<TokenType>, object>>,
  Expect<ObjectPropertyEquals<Token<TokenType>, 'type', TokenType>>,
  Expect<ObjectPropertyEquals<Token<TokenType>, 'value', string>>,
  Expect<ObjectPropertyEquals<Token<TokenType>, 'pos', number>>,
  Expect<ObjectPropertyEquals<Token<'X'>, 'type', 'X'>>,

  Expect<Extends<LastToken<TokenType>, object>>,
  Expect<ObjectPropertyEquals<LastToken<TokenType>, 'type', TokenType>>,
  Expect<ObjectPropertyEquals<LastToken<TokenType>, 'pos', number>>,
  Expect<ObjectPropertyEquals<LastToken<'X'>, 'type', 'X'>>,
]>
