import { createOneOf } from '../one-of'
import { lengthTest } from '../tools/length-test'
import type { Test } from '../types/test-types'

export function moreOfTest(tests: Test[]): Test {
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
      currentPos += result.length
    }

    // return processed length
    return currentPos - pos

  })
}
