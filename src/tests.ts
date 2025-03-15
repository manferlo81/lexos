import { createOneOf } from './one-of'
import { isArray, isType } from './tools/is'
import { makeInsensitive } from './tools/string-case'
import type { AnyTest, Test } from './types/test-types'

export function regexpTest(regexp: RegExp): Test {

  // return test
  return (input, pos) => {
    // test partial against RegExp
    const partial = input.substring(pos)
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

function singleStringTest(value: string, insensitive?: unknown): Test {

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

export function stringTest(value: string | string[], insensitive?: boolean): Test {
  if (isArray(value)) return createOneOf(value.map((value) => singleStringTest(value, insensitive)))
  return singleStringTest(value, insensitive)
}

export function ruleTest(test: AnyTest): Test {

  // return function as test if it's a function
  if (isType(test, 'function')) return test

  // return string test if it's a string
  if (isType(test, 'string')) return singleStringTest(test)

  // return regexp test if it's a regexp
  if (!isArray(test)) return regexpTest(test)

  // return one-of test if it's an array
  const tests = test.map((value) => ruleTest(value))
  return createOneOf(tests)

}
