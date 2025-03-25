import { createOneOf } from '../one-of'
import { getLengthFromResult } from '../tools/result-tools'
import type { LengthTest } from '../types/length-test-types'
import type { Test } from '../types/test-types'

export function moreOfTest(tests: Test[]): LengthTest {
  // create test
  const test = createOneOf(tests)

  // return test
  return (input, pos) => {

    // initialize variables and constants
    const inputLength = input.length
    let currentPos = pos

    // loop
    Loop: while (currentPos < inputLength) {
      // get result of first test that matched
      const result = test(input, currentPos)

      // break out of the loop if no test matched
      if (!result) break Loop

      // advance position and continue loop
      currentPos += getLengthFromResult(result)
    }

    // return processed length (if any)
    if (currentPos > pos) return currentPos - pos

  }
}
