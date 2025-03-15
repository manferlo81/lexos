import type { Test } from './types/test-types'

export function sequentialTest(tests: Test[]): Test {
  // return test
  return (input, pos) => {
    // initialize position
    let localPos = 0

    // loop though tests
    for (const test of tests) {
      // run test against code on current position
      const result = test(input, pos + localPos)

      // fail if corresponding test didn't match
      if (!result) return

      // advance position and continue loop
      localPos += result.length
    }

    // return successful result if some of the input was processed...
    if (localPos) return {
      value: input.substring(pos, pos + localPos),
      length: localPos,
    }

    // fail otherwise
  }
}
