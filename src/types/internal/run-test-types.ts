import type { TestResult } from '../test-types'

export type RunTestCallback<R> = (result: TestResult) => R
