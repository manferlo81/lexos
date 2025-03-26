import type { PotentiallyFalsy } from './helper-types'
import type { RuleBase } from './private-types'
import type { ValueTestResult } from './test-value-types'

export type TestResult = number | ValueTestResult
export type PotentialTestResult = PotentiallyFalsy<TestResult>

export type Test = RuleBase<TestResult>

export type StringifyableTest = string | number
export type CompilableTest = RegExp | StringifyableTest | AnyTest[]
export type AnyTest = CompilableTest | Test
