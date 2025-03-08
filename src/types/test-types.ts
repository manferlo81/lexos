import type { CodeProcessingFunction } from './helper-types'

export interface TestResult {
  value: string
  length: number
}

export type Test = CodeProcessingFunction<TestResult>
