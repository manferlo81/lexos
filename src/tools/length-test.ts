import type { LengthTest } from '../types/length-test-types'
import type { RuleResult } from '../types/rule-types'
import type { TokenType } from '../types/token-types'
import type { ValueTest } from '../types/value-test-types'
import { isType } from './is'

export function lengthTest(getLength: LengthTest): ValueTest {
  // return test
  return (input, pos) => {

    // get processed length
    const length = getLength(input, pos)

    // return successful result if some of the input was processed...
    if (length && length > 0) {
      const value = input.slice(pos, pos + length)
      return { value, length }
    }

    // fail otherwise
  }
}

export function getLengthFromResult(result: RuleResult<TokenType, TokenType>): number {
  if (isType(result, 'number')) return result
  return result.length
}
