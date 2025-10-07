import type { Falsy, RuleBase } from './helper-types'
import type { ValueTestResult } from './test-value-types'

export type TestResult = number | ValueTestResult
export type PotentialTestResult = TestResult | Falsy

export type Test = RuleBase<TestResult>

export type StringifyableTest = string | number
export type CompilableTest = RegExp | StringifyableTest | readonly AnyTest[]
export type AnyTest = CompilableTest | Test
