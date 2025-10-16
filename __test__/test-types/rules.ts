import type { MultiTokenRule, MultiTokenRuleResult, PotentialMultiTokenRuleResult, PotentialRuleResult, PotentialSingleTokenRuleResult, Rule, RuleList, RuleResult, RuleToken, SingleTokenRule, SingleTokenRuleResult, TestResult, TokenGenerator, TokenType, UnifiableRules } from '../../src'
import type { And, Equals, Expect, Extends, ObjectPropertyEquals } from './types-test-tools'

type Falsy = false | null | undefined

export type Results = And<[
  Expect<Equals<Rule<TokenType, TokenType>, (input: string, pos: number) => PotentialRuleResult<TokenType, TokenType>>>,
  Expect<Equals<Rule<'T', 'L'>, (input: string, pos: number) => PotentialRuleResult<'T', 'L'>>>,

  Expect<Equals<RuleList<TokenType, TokenType>, ReadonlyArray<Rule<TokenType, TokenType>>>>,
  Expect<Equals<RuleList<'T', 'L'>, ReadonlyArray<Rule<'T', 'L'>>>>,

  Expect<Equals<UnifiableRules<TokenType, TokenType>, Rule<TokenType, TokenType> | RuleList<TokenType, TokenType>>>,
  Expect<Equals<UnifiableRules<'T', 'L'>, Rule<'T', 'L'> | RuleList<'T', 'L'>>>,

  Expect<Equals<PotentialRuleResult<TokenType, TokenType>, RuleResult<TokenType, TokenType> | Falsy>>,
  Expect<Equals<PotentialRuleResult<'T', 'L'>, RuleResult<'T', 'L'> | Falsy>>,

  Expect<Equals<RuleResult<TokenType, TokenType>, SingleTokenRuleResult<TokenType> | MultiTokenRuleResult<TokenType, TokenType> | TestResult>>,
  Expect<Equals<RuleResult<'T', 'L'>, SingleTokenRuleResult<'T'> | MultiTokenRuleResult<'T', 'L'> | TestResult>>,

  Expect<Extends<SingleTokenRule<TokenType>, Rule<TokenType, TokenType>>>,
  Expect<Extends<SingleTokenRule<'T'>, Rule<'T', TokenType>>>,
  Expect<Equals<SingleTokenRule<TokenType>, (input: string, pos: number) => PotentialSingleTokenRuleResult<TokenType>>>,
  Expect<Equals<SingleTokenRule<'T', 'V'>, (input: string, pos: number) => PotentialSingleTokenRuleResult<'T', 'V'>>>,

  Expect<Extends<PotentialSingleTokenRuleResult<TokenType>, PotentialRuleResult<TokenType, TokenType>>>,
  Expect<Extends<PotentialSingleTokenRuleResult<'T'>, PotentialRuleResult<'T', TokenType>>>,
  Expect<Equals<PotentialSingleTokenRuleResult<TokenType>, SingleTokenRuleResult<TokenType> | Falsy>>,
  Expect<Equals<PotentialSingleTokenRuleResult<'T', 'V'>, SingleTokenRuleResult<'T', 'V'> | Falsy>>,

  Expect<Extends<SingleTokenRuleResult<TokenType>, RuleResult<TokenType, TokenType>>>,
  Expect<Extends<SingleTokenRuleResult<'T'>, RuleResult<'T', TokenType>>>,
  Expect<Extends<SingleTokenRuleResult<TokenType>, object>>,
  Expect<ObjectPropertyEquals<SingleTokenRuleResult<TokenType>, 'length', number>>,
  Expect<ObjectPropertyEquals<SingleTokenRuleResult<TokenType>, 'token', RuleToken<TokenType>>>,
  Expect<ObjectPropertyEquals<SingleTokenRuleResult<'T'>, 'token', RuleToken<'T'>>>,
  Expect<ObjectPropertyEquals<SingleTokenRuleResult<'T', 'V'>, 'token', RuleToken<'T', 'V'>>>,

  Expect<Extends<RuleToken<TokenType>, object>>,
  Expect<ObjectPropertyEquals<RuleToken<TokenType>, 'type', TokenType>>,
  Expect<ObjectPropertyEquals<RuleToken<'T'>, 'type', 'T'>>,
  Expect<ObjectPropertyEquals<RuleToken<TokenType>, 'value', string>>,

  Expect<Extends<MultiTokenRule<TokenType, TokenType>, Rule<TokenType, TokenType>>>,
  Expect<Extends<MultiTokenRule<'T', 'L'>, Rule<'T', 'L'>>>,
  Expect<Equals<MultiTokenRule<TokenType, TokenType>, (input: string, pos: number) => PotentialMultiTokenRuleResult<TokenType, TokenType>>>,
  Expect<Equals<MultiTokenRule<'T', 'L'>, (input: string, pos: number) => PotentialMultiTokenRuleResult<'T', 'L'>>>,

  Expect<Extends<PotentialMultiTokenRuleResult<TokenType, TokenType>, PotentialRuleResult<TokenType, TokenType>>>,
  Expect<Extends<PotentialMultiTokenRuleResult<'T', 'L'>, PotentialRuleResult<'T', 'L'>>>,
  Expect<Equals<PotentialMultiTokenRuleResult<TokenType, TokenType>, MultiTokenRuleResult<TokenType, TokenType> | Falsy>>,
  Expect<Equals<PotentialMultiTokenRuleResult<'T', 'L'>, MultiTokenRuleResult<'T', 'L'> | Falsy>>,

  Expect<Extends<MultiTokenRuleResult<TokenType, TokenType>, RuleResult<TokenType, TokenType>>>,
  Expect<Extends<MultiTokenRuleResult<'T', 'L'>, RuleResult<'T', 'L'>>>,
  Expect<Extends<MultiTokenRuleResult<TokenType, TokenType>, object>>,
  Expect<ObjectPropertyEquals<MultiTokenRuleResult<TokenType, TokenType>, 'length', number>>,
  Expect<ObjectPropertyEquals<MultiTokenRuleResult<TokenType, TokenType>, 'generator', TokenGenerator<TokenType, TokenType>>>,
  Expect<ObjectPropertyEquals<MultiTokenRuleResult<'T', 'L'>, 'generator', TokenGenerator<'T', 'L'>>>,
]>
