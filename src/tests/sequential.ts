import { lengthTest } from '../tools/length-test'
import type { Test } from '../types/test-types'

export function sequentialTest(tests: Test[]): Test {
  // return test
  return lengthTest((input, pos) => {

    // initialize variables and constants
    const inputLength = input.length
    let currentPos = pos

    // loop though tests
    for (const test of tests) {

      // fail if current position reaches end of input
      if (currentPos >= inputLength) return

      // run test against code on current position
      const result = test(input, currentPos)

      // fail if corresponding test didn't match
      if (!result) return

      // advance position and continue loop
      currentPos += result.length
    }

    // return processed length
    return currentPos - pos

  })

}
