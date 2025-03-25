import type { TestResult } from '../types/test-types'
import { isType } from './is'

export function getLengthFromResult(result: TestResult): number {
  if (isType(result, 'number')) return result
  return result.length
}
