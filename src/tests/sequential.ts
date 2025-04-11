import { getLengthFromResult } from '../tools/result-tools'
import type { TestList } from '../types/private-types'
import type { LengthTest } from '../types/test-length-types'

export function sequentialTest(tests: TestList): LengthTest {
  // return test
  return (input, pos) => {

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
      currentPos += getLengthFromResult(result)
    }

    // return processed length (if any)
    if (currentPos > pos) return currentPos - pos

  }

}
