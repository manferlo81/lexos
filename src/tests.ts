import { getFirstTruthyResult } from './first-test'
import type { Test } from './types/test-types'

export function regexpTest(regexp: RegExp): Test {
  // return test
  return (code, pos) => {
    const partial = code.substring(pos)
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
  return (code, pos) => {
    // normalize partial value to compare
    const partialToLength = code.substring(pos, pos + length)
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
  return (code, currentPos) => {
    let pos = 0
    for (const test of tests) {
      const result = getFirstTruthyResult([test], code, currentPos + pos)
      if (!result) return
      const { length } = result
      pos += length
    }
    const value = code.substring(currentPos, currentPos + pos)
    return { value, length: pos }
  }
}

export function moreOfTest(tests: Test[]): Test {
  return (code, pos_) => {
    let pos = 0
    Loop: while (pos_ + pos < code.length) {
      const result = getFirstTruthyResult(tests, code, pos_ + pos)
      if (!result) {
        if (pos === 0) return
        break Loop
      }
      const { length } = result
      pos += length
    }
    return { value: code.substring(pos_, pos_ + pos), length: pos }
  }
}

export function oneOfTest(tests: Test[]): Test {
  return (code, pos) => {
    for (const test of tests) {
      const result = test(code, pos)
      if (result) return result
    }
  }
}
