import type { CodeProcessingFunction, FalsyReturn } from './helper-types'
import type { ValueTestResult } from './value-test-types'

export type TestResult = number | ValueTestResult
export type PotentialTestResult = TestResult | FalsyReturn

export type Test = CodeProcessingFunction<PotentialTestResult>

export type StringifyableTest = string | number
export type CompilableTest = RegExp | StringifyableTest | AnyTest[]
export type AnyTest = CompilableTest | Test
