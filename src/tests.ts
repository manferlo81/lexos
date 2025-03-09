import { getFirstTruthyResult } from './first-test'
import type { MultiList } from './types/helper-types'
import type { MultiTestList, Test } from './types/test-types'

export function regexpTest(regexp: RegExp): Test {
  // return test
  return (code, currentPos) => {
    //
    const partial = code.substring(currentPos)

    // match regexp against partial
    const match = regexp.exec(partial)

    // return no match if no match
    if (!match) return

    // return no match if it doesn't match the very beginning of partial
    const { index } = match
    if (index !== 0) return

    // return no match if value is empty
    const [value] = match
    const { length } = value
    if (!length) return

    // return match result
    return { value, length }
  }
}

function makeInsensitive(value: string, insensitive?: boolean) {
  return insensitive ? value.toLowerCase() : value
}

export function stringTest(value: '', insensitive?: boolean): never
export function stringTest(value: string, insensitive?: boolean): Test
export function stringTest(value: string, insensitive?: boolean): Test {
  // throw if value length is zero
  const { length } = value
  if (!length) throw Error('Zero length string test')

  // normalize value to compare
  const valueToCompare = makeInsensitive(value, insensitive)

  // return test
  return (code, currentPos) => {
    // return no match if there is not enough code to process
    const end = currentPos + length
    if (end > code.length) return

    // normalize partial value to compare
    const partialToLength = code.substring(currentPos, end)
    const partialToCompare = makeInsensitive(partialToLength, insensitive)

    // return no match if values don't match
    if (partialToCompare !== valueToCompare) return

    // return match result if values match
    return {
      value: partialToLength,
      length,
    }
  }
}

export function sequentialTest(tests: MultiTestList): Test {
  // return test
  return (code, currentPos) => {
    // initialize position
    let localPos = 0

    // loop though tests
    for (const test of tests) {
      // run test against code on current position
      const result = test(code, currentPos + localPos)

      // return no match if test didn't match
      if (!result) return

      // advance position and continue loop
      const { length } = result
      localPos += length
    }

    // return no match if no code was processed
    if (!localPos) return

    // return match result
    return {
      value: code.substring(currentPos, currentPos + localPos),
      length: localPos,
    }
  }
}

export function oneOfTest(tests: MultiTestList): Test {
  // return test
  return (code, currentPos) => {
    // iterate through tests
    for (const test of tests) {
      // return result if it matches
      const result = test(code, currentPos)
      if (result) return result
    }
    // return no match (void) if no test matched
  }
}

export function oneOfStringTest(values: MultiList<string>, insensitive?: boolean) {
  // create tests from values
  const tests = values.map((value) => stringTest(value, insensitive)) as MultiTestList
  // return one-of test
  return oneOfTest(tests)
}

export function moreOfTest(tests: MultiTestList): Test {
  // return test
  return (code, currentPos) => {
    // initialize variables and constants
    const codeLength = code.length
    let posOffset = 0

    // loop
    Loop: while (currentPos + posOffset < codeLength) {
      // get result of first test that matched
      const result = getFirstTruthyResult(tests, code, currentPos + posOffset)

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
      value: code.substring(currentPos, currentPos + posOffset),
      length: posOffset,
    }
  }
}
