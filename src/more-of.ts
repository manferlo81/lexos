import { createOneOf } from './one-of'
import type { Test } from './types/test-types'

export function moreOfTest(tests: Test[]): Test {
  // create test
  const test = createOneOf(tests)
  // return test
  return (input, pos) => {
    // initialize variables and constants
    const codeLength = input.length
    let posOffset = 0

    // loop
    Loop: while (pos + posOffset < codeLength) {
      // get result of first test that matched
      const result = test(input, pos + posOffset)

      // break out of the loop if no test matched
      if (!result) break Loop

      // advance position and continue loop
      const { length } = result
      posOffset += length
    }

    // return no match if no code was processed
    if (!posOffset) return

    // return match result
    return {
      value: input.substring(pos, pos + posOffset),
      length: posOffset,
    }
  }
}
