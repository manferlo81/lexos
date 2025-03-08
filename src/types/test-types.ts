import type { CodeProcessingFunction } from './helper-types'

export interface ExtendedTestResult {
  value: string
  length: number
}

export type TestResult = ExtendedTestResult

export type Test = CodeProcessingFunction<TestResult>
