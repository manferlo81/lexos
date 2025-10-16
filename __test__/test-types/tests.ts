import type { AnyTest, CompilableTest, LengthTest, PotentialLengthTestResult, PotentialRuleResult, PotentialTestResult, PotentialValueTestResult, Rule, RuleResult, StringifyableTest, Test, TestResult, TokenType, ValueTest, ValueTestResult } from '../../src'
import type { And, Equals, Expect, Extends, ObjectPropertyEquals } from './types-test-tools'

type Falsy = false | null | undefined

export type Results = And<[
  Expect<Equals<AnyTest, Test | CompilableTest>>,

  Expect<Extends<Test, Rule<TokenType, TokenType>>>,
  Expect<Equals<Test, (input: string, pos: number) => PotentialTestResult>>,

  Expect<Extends<LengthTest, Test>>,
  Expect<Equals<LengthTest, (input: string, pos: number) => PotentialLengthTestResult>>,

  Expect<Extends<ValueTest, Test>>,
  Expect<Equals<ValueTest, (input: string, pos: number) => PotentialValueTestResult>>,

  Expect<Equals<CompilableTest, RegExp | StringifyableTest | readonly AnyTest[]>>,
  Expect<Equals<StringifyableTest, string | number>>,

  Expect<Extends<PotentialTestResult, PotentialRuleResult<TokenType, TokenType>>>,
  Expect<Equals<PotentialTestResult, TestResult | Falsy>>,

  Expect<Extends<TestResult, RuleResult<TokenType, TokenType>>>,
  Expect<Equals<TestResult, ValueTestResult | number>>,

  Expect<Equals<PotentialLengthTestResult, number | Falsy>>,
  Expect<Extends<PotentialLengthTestResult, PotentialTestResult>>,

  Expect<Extends<PotentialValueTestResult, PotentialTestResult>>,
  Expect<Equals<PotentialValueTestResult, ValueTestResult | Falsy>>,

  Expect<Extends<ValueTestResult, TestResult>>,
  Expect<Extends<ValueTestResult, object>>,
  Expect<ObjectPropertyEquals<ValueTestResult, 'length', number>>,
  Expect<ObjectPropertyEquals<ValueTestResult, 'value', string>>,
]>
