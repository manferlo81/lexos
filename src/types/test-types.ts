import type { FalsyReturn } from './helper-types'

export interface ExtendedTestResult {
  value: string
  length: number
}

export type TestResult = ExtendedTestResult

export type Test = (code: string, currentPosition: number) => TestResult | FalsyReturn
