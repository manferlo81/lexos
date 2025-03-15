import type { CodeProcessingFunction, FalsyReturn, Lengthy, Valued } from './internal/helper-types'

export interface TestResult extends Lengthy, Valued {}

export type Test = CodeProcessingFunction<TestResult | FalsyReturn>

export type StringifyableTest = string | number
export type CompilableTest = RegExp | StringifyableTest | AnyTest[]
export type AnyTest = CompilableTest | Test
