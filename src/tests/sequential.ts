import type { Test } from '../types/test-types'

export function sequentialTest(tests: Test[]): Test {
  // return test
  return (input, pos) => {
    // initialize variables and constants
    const inputLength = input.length
    let posOffset = 0

    // loop though tests
    for (const test of tests) {

      // fail if current position reaches end of input
      if (pos + posOffset >= inputLength) return

      // run test against code on current position
      const result = test(input, pos + posOffset)

      // fail if corresponding test didn't match
      if (!result) return

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
