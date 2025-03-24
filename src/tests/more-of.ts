import { createOneOf } from '../one-of'
import { getLengthFromResult, lengthTest } from '../tools/length-test'
import type { Test } from '../types/test-types'
import type { ValueTest } from '../types/value-test-types'

export function moreOfTest(tests: Test[]): ValueTest {
  // create test
  const test = createOneOf(tests)

  // return test
  return lengthTest((input, pos) => {

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

    // return processed length
    return currentPos - pos

  })
}
