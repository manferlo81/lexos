import type { CodeProcessingFunction, FalsyReturn, WithLength, WithValue } from './helper-types'

export interface TestResult extends WithLength, WithValue {}
export type PotentialTestResult = TestResult | FalsyReturn

export type Test = CodeProcessingFunction<PotentialTestResult>

export type StringifyableTest = string | number
export type CompilableTest = RegExp | StringifyableTest | AnyTest[]
export type AnyTest = CompilableTest | Test
