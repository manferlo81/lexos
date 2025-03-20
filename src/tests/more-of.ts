import { createOneOf } from '../one-of'
import type { Test } from '../types/test-types'

export function moreOfTest(tests: Test[]): Test {
  // create test
  const test = createOneOf(tests)
  // return test
  return (input, pos) => {
    // initialize variables and constants
    const inputLength = input.length
    let posOffset = 0

    // loop
    Loop: while (pos + posOffset < inputLength) {
      // get result of first test that matched
      const result = test(input, pos + posOffset)

      // break out of the loop if no test matched
      if (!result) break Loop

      // advance position and continue loop
      posOffset += result.length
    }

    // return successful result if some of the input was processed...
    if (posOffset) return {
      value: input.substring(pos, pos + posOffset),
      length: posOffset,
    }

    // fail otherwise
  }
}
