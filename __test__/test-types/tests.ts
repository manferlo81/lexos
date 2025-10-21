import type { AnyTest, CompilableTest, LengthTest, PotentialLengthTestResult, PotentialRuleResult, PotentialTestResult, PotentialValueTestResult, Rule, RuleResult, StringifyableTest, Test, TestResult, TokenType, ValueTest, ValueTestResult } from '../../src'
import type { And, AssignableTo, Equals, Expect } from './types-test-tools'

type Falsy = false | null | undefined

export type Results = And<[
  Expect<Equals<AnyTest, Test | CompilableTest>>,

  Expect<AssignableTo<Test, Rule<TokenType, TokenType>>>,
  Expect<Equals<Test, (input: string, pos: number) => PotentialTestResult>>,

  Expect<AssignableTo<LengthTest, Test>>,
  Expect<Equals<LengthTest, (input: string, pos: number) => PotentialLengthTestResult>>,

  Expect<AssignableTo<ValueTest, Test>>,
  Expect<Equals<ValueTest, (input: string, pos: number) => PotentialValueTestResult>>,

  Expect<Equals<CompilableTest, RegExp | StringifyableTest | readonly AnyTest[]>>,
  Expect<Equals<StringifyableTest, string | number>>,

  Expect<AssignableTo<PotentialTestResult, PotentialRuleResult<TokenType, TokenType>>>,
  Expect<Equals<PotentialTestResult, TestResult | Falsy>>,

  Expect<AssignableTo<TestResult, RuleResult<TokenType, TokenType>>>,
  Expect<Equals<TestResult, ValueTestResult | number>>,

  Expect<Equals<PotentialLengthTestResult, number | Falsy>>,
  Expect<AssignableTo<PotentialLengthTestResult, PotentialTestResult>>,

  Expect<AssignableTo<PotentialValueTestResult, PotentialTestResult>>,
  Expect<Equals<PotentialValueTestResult, ValueTestResult | Falsy>>,

  Expect<AssignableTo<ValueTestResult, TestResult>>,
  Expect<AssignableTo<ValueTestResult, object>>,
  Expect<Equals<ValueTestResult['length'], number>>,
  Expect<Equals<ValueTestResult['value'], string>>,
]>
