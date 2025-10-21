import type { MultiTokenRule, MultiTokenRuleResult, PotentialMultiTokenRuleResult, PotentialRuleResult, PotentialSingleTokenRuleResult, Rule, RuleList, RuleResult, RuleToken, SingleTokenRule, SingleTokenRuleResult, TestResult, TokenGenerator, TokenType, UnifiableRules } from '../../src'
import type { And, AssignableTo, Equals, Expect } from './types-test-tools'

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

  Expect<AssignableTo<SingleTokenRule<TokenType>, Rule<TokenType, TokenType>>>,
  Expect<AssignableTo<SingleTokenRule<'T'>, Rule<'T', TokenType>>>,
  Expect<Equals<SingleTokenRule<TokenType>, (input: string, pos: number) => PotentialSingleTokenRuleResult<TokenType>>>,
  Expect<Equals<SingleTokenRule<'T', 'V'>, (input: string, pos: number) => PotentialSingleTokenRuleResult<'T', 'V'>>>,

  Expect<AssignableTo<PotentialSingleTokenRuleResult<TokenType>, PotentialRuleResult<TokenType, TokenType>>>,
  Expect<AssignableTo<PotentialSingleTokenRuleResult<'T'>, PotentialRuleResult<'T', TokenType>>>,
  Expect<Equals<PotentialSingleTokenRuleResult<TokenType>, SingleTokenRuleResult<TokenType> | Falsy>>,
  Expect<Equals<PotentialSingleTokenRuleResult<'T', 'V'>, SingleTokenRuleResult<'T', 'V'> | Falsy>>,

  Expect<AssignableTo<SingleTokenRuleResult<TokenType>, RuleResult<TokenType, TokenType>>>,
  Expect<AssignableTo<SingleTokenRuleResult<'T'>, RuleResult<'T', TokenType>>>,
  Expect<AssignableTo<SingleTokenRuleResult<TokenType>, object>>,
  Expect<Equals<SingleTokenRuleResult<TokenType>['length'], number>>,
  Expect<Equals<SingleTokenRuleResult<TokenType>['token'], RuleToken<TokenType>>>,
  Expect<Equals<SingleTokenRuleResult<'T'>['token'], RuleToken<'T'>>>,
  Expect<Equals<SingleTokenRuleResult<'T', 'V'>['token'], RuleToken<'T', 'V'>>>,

  Expect<AssignableTo<RuleToken<TokenType>, object>>,
  Expect<Equals<RuleToken<TokenType>['type'], TokenType>>,
  Expect<Equals<RuleToken<'T'>['type'], 'T'>>,
  Expect<Equals<RuleToken<TokenType>['value'], string>>,

  Expect<AssignableTo<MultiTokenRule<TokenType, TokenType>, Rule<TokenType, TokenType>>>,
  Expect<AssignableTo<MultiTokenRule<'T', 'L'>, Rule<'T', 'L'>>>,
  Expect<Equals<MultiTokenRule<TokenType, TokenType>, (input: string, pos: number) => PotentialMultiTokenRuleResult<TokenType, TokenType>>>,
  Expect<Equals<MultiTokenRule<'T', 'L'>, (input: string, pos: number) => PotentialMultiTokenRuleResult<'T', 'L'>>>,

  Expect<AssignableTo<PotentialMultiTokenRuleResult<TokenType, TokenType>, PotentialRuleResult<TokenType, TokenType>>>,
  Expect<AssignableTo<PotentialMultiTokenRuleResult<'T', 'L'>, PotentialRuleResult<'T', 'L'>>>,
  Expect<Equals<PotentialMultiTokenRuleResult<TokenType, TokenType>, MultiTokenRuleResult<TokenType, TokenType> | Falsy>>,
  Expect<Equals<PotentialMultiTokenRuleResult<'T', 'L'>, MultiTokenRuleResult<'T', 'L'> | Falsy>>,

  Expect<AssignableTo<MultiTokenRuleResult<TokenType, TokenType>, RuleResult<TokenType, TokenType>>>,
  Expect<AssignableTo<MultiTokenRuleResult<'T', 'L'>, RuleResult<'T', 'L'>>>,
  Expect<AssignableTo<MultiTokenRuleResult<TokenType, TokenType>, object>>,
  Expect<Equals<MultiTokenRuleResult<TokenType, TokenType>['length'], number>>,
  Expect<Equals<MultiTokenRuleResult<TokenType, TokenType>['generator'], TokenGenerator<TokenType, TokenType>>>,
  Expect<Equals<MultiTokenRuleResult<'T', 'L'>['generator'], TokenGenerator<'T', 'L'>>>,
]>
