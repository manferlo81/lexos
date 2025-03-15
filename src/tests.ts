import { createOneOf } from './one-of'
import { isArray, isType } from './tools/is'
import { makeInsensitive } from './tools/string-case'
import type { AnyTest, StringifyableTest, Test } from './types/test-types'

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

function singleStringTest(value: StringifyableTest, insensitive?: unknown): Test {

  const valueAsString = `${value}`

  // throw if value length is zero
  const length = valueAsString.length
  if (!length) throw Error('Zero length string test')

  // make value insensitive if necessary
  const valueInsensitive = makeInsensitive(valueAsString, insensitive)

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

function mapTests<T extends AnyTest, A extends unknown[]>(tests: T[], createTest: (test: T, ...args: A) => Test, ...args: A) {
  return tests.map((test) => createTest(test, ...args))
}

export function stringTest(value: number): Test
export function stringTest(values: number[]): Test
export function stringTest(value: string, insensitive?: boolean): Test
export function stringTest(values: StringifyableTest[], insensitive?: boolean): Test
export function stringTest(test: StringifyableTest | StringifyableTest[], insensitive?: boolean): Test
export function stringTest(test: StringifyableTest | StringifyableTest[], insensitive?: boolean): Test {
  if (isType(test, 'string', 'number')) return singleStringTest(test, insensitive)
  return createOneOf(mapTests(test, singleStringTest, insensitive))
}

export function ruleTest(test: AnyTest): Test {

  // return function as test if it's a function
  if (isType(test, 'function')) return test

  // return string test if it's a string
  if (isType(test, 'string', 'number')) return singleStringTest(test)

  // return one-of test if it's an array
  if (isArray(test)) return createOneOf(mapTests(test, ruleTest))

  // return regexp test if it's a regexp
  return regexpTest(test)

}
