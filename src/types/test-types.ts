import type { CodeProcessingFunction, FalsyReturn, Lengthy, Valued } from './internal/helper-types'

export interface TestResult extends Lengthy, Valued {}

export type Test = CodeProcessingFunction<TestResult | FalsyReturn>
