import type { CodeProcessingFunction, Lengthy, List, MultiList, Valuable } from './helper-types'

export interface TestResult extends Lengthy, Valuable {}

export type Test = CodeProcessingFunction<TestResult>
export type TestList = List<Test>
export type MultiTestList = MultiList<Test>
