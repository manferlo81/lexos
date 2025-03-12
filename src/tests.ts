import { oneOfRule } from './one-of'
import { makeInsensitive } from './tools/string-case'
import type { Test } from './types/test-types'

export function regexpTest(regexp: RegExp): Test {

  // return test
  return (input, currentPosition) => {
    // test partial against RegExp
    const partial = input.substring(currentPosition)
    const result = regexp.exec(partial)

    // fail if RegExp didn't match
    if (!result) return

    // fail if it didn't match the very beginning
    if (result.index !== 0) return

    // return successful result if it's not a zero length value...
    const value = result[0]
    const length = value.length
    if (length) return { value, length }

    // fail otherwise
  }
}

export function stringTest(value: string, insensitive?: boolean): Test {

  // throw if value length is zero
  const length = value.length
  if (!length) throw Error('Zero length string test')

  // make value insensitive if necessary
  const valueInsensitive = makeInsensitive(value, insensitive)

  // return test
  return (input, currentPosition) => {
    const end = currentPosition + length

    // fail if there is not enough input to compare
    if (end > input.length) return

    // crop partial to length and make insensitive if needed
    const partialToLength = input.substring(currentPosition, end)
    const partialToCompare = makeInsensitive(partialToLength, insensitive)

    // return successful result if it matches...
    if (partialToCompare === valueInsensitive) return { length, value: partialToLength }

    // fail otherwise
  }
}

export function oneOfStringTest(values: string[], insensitive?: boolean): Test {
  // create tests from values
  const tests = values.map((value) => stringTest(value, insensitive))
  // return one-of test
  return oneOfRule(tests)
}
