import { stringTest } from './tests'
import { createOneOf } from './tools/one-of'
import type { Test } from './types/test-types'

export function sequentialTest(tests: Test[]): Test {
  // return test
  return (input, currentPosition) => {
    // initialize position
    let localPos = 0

    // loop though tests
    for (const test of tests) {
      // run test against code on current position
      const result = test(input, currentPosition + localPos)

      // fail if corresponding test didn't match
      if (!result) return

      // advance position and continue loop
      localPos += result.length
    }

    // return successful result if some of the input was processed...
    if (localPos) return {
      value: input.substring(currentPosition, currentPosition + localPos),
      length: localPos,
    }

    // fail otherwise
  }
}

export function oneOfTest(tests: Test[]): Test {
  // return test
  return createOneOf(tests)
}

export function oneOfStringTest(values: string[], insensitive?: boolean) {
  // create tests from values
  const tests = values.map((value) => stringTest(value, insensitive))
  // return one-of test
  return oneOfTest(tests)
}

export function moreOfTest(tests: Test[]): Test {
  // create test
  const test = createOneOf(tests)
  // return test
  return (input, currentPosition) => {
    // initialize variables and constants
    const codeLength = input.length
    let posOffset = 0

    // loop
    Loop: while (currentPosition + posOffset < codeLength) {
      // get result of first test that matched
      const result = test(input, currentPosition + posOffset)

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
      value: input.substring(currentPosition, currentPosition + posOffset),
      length: posOffset,
    }
  }
}
