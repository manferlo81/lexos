import { getFirstTruthyResult } from './first-test'
import type { Test } from './types/test-types'

export function regexpTest(regexp: RegExp): Test {
  // return test
  return (partial) => {
    // match regexp against partial
    const match = regexp.exec(partial)

    // return falsy if no match
    if (!match) return

    // return falsy if it doesn't match the very beginning of partial
    const { index } = match
    if (index !== 0) return

    // return falsy if value is empty
    const [value] = match
    const { length } = value
    if (!length) return

    // return result
    return { value, length }
  }
}

function makeInsensitive(value: string, insensitive?: boolean) {
  return insensitive ? value.toLowerCase() : value
}

export function stringTest(value: string, insensitive?: boolean): Test {
  // throw if value length is zero
  const { length } = value
  if (!length) throw Error('Zero length string test')

  // normalize value to compare
  const valueToCompare = makeInsensitive(value, insensitive)

  // return test
  return (partial) => {
    // normalize partial value to compare
    const partialToLength = partial.substring(0, length)
    const partialToCompare = makeInsensitive(partialToLength, insensitive)

    // return result if values match
    if (partialToCompare === valueToCompare) {
      return {
        value: partialToLength,
        length,
      }
    }
  }
}

export function sequentialTest(tests: Test[]): Test {
  return (partial) => {
    let pos = 0
    for (const test of tests) {
      const result = getFirstTruthyResult([test], partial, pos)
      if (!result) return
      const { length } = result
      pos += length
    }
    const value = partial.substring(0, pos)
    return { value, length: pos }
  }
}

export function anyOfTest(tests: Test[]): Test {
  return (partial) => {
    const partialLength = partial.length
    let pos = 0
    while (pos < partialLength) {
      const result = getFirstTruthyResult(tests, partial, pos)
      if (!result) {
        if (pos === 0) return
        return {
          length: pos,
          value: partial.substring(0, pos),
        }
      }
      const { length } = result
      pos += length
    }
    return { value: partial, length: partialLength }
  }
}

export function oneOfTest(tests: Test[]): Test {
  return (partial) => {
    for (const test of tests) {
      const result = test(partial)
      if (result) return result
    }
  }
}
