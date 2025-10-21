import type { CreateTokenGenerator, GetTokenType, LastToken, Token, TokenGenerator, TokenType } from '../../src'
import type { And, AssignableTo, Equals, Expect } from './types-test-tools'

export type Results = And<[
  Expect<Equals<CreateTokenGenerator<TokenType, TokenType>, (input: string, offset?: number) => TokenGenerator<TokenType, TokenType>>>,
  Expect<Equals<CreateTokenGenerator<'T', 'L'>, (input: string, offset?: number) => TokenGenerator<'T', 'L'>>>,

  Expect<Equals<TokenGenerator<TokenType, TokenType>, Generator<Token<TokenType> | LastToken<TokenType>, void, void>>>,
  Expect<Equals<TokenGenerator<'A', 'B'>, Generator<Token<'A'> | LastToken<'B'>, void, void>>>,

  Expect<Equals<GetTokenType<TokenType>, (value: string) => TokenType | false | null | undefined>>,
  Expect<Equals<TokenType, string | number>>,

  Expect<AssignableTo<Token<TokenType>, object>>,
  Expect<Equals<Token<TokenType>['type'], TokenType>>,
  Expect<Equals<Token<TokenType>['value'], string>>,
  Expect<Equals<Token<TokenType>['pos'], number>>,
  Expect<Equals<Token<'X'>['type'], 'X'>>,

  Expect<AssignableTo<LastToken<TokenType>, object>>,
  Expect<Equals<LastToken<TokenType>['type'], TokenType>>,
  Expect<Equals<LastToken<TokenType>['pos'], number>>,
  Expect<Equals<LastToken<'X'>['type'], 'X'>>,
]>
