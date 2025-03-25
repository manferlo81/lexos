import { createOneOf } from '../one-of'
import { isArray, isType } from '../tools/is'
import { mapItemsWithArgs } from '../tools/map-items'
import type { StringifyableTest } from '../types/test-types'
import type { ValueTest } from '../types/value-test-types'

type StringMatchFunction = (partial: string) => boolean

function createStringMatchFunction(value: string, insensitive?: unknown): StringMatchFunction {
  // return case sensitive string match function
  if (!insensitive) return (partial: string) => partial === value

  // make value insensitive
  const referenceValue = value.toLowerCase()

  // return case insensitive string match function
  return (partial: string) => partial.toLowerCase() === referenceValue
}

function singleStringTest(value: string, insensitive?: unknown): ValueTest {
  // throw if value length is zero
  const length = value.length
  if (length <= 0) throw Error('Zero length string test')

  // create match function
  const matches = createStringMatchFunction(value, insensitive)

  // return test
  return (input, pos) => {
    // compute end position
    const end = pos + length

    // fail if there is not enough input to compare
    if (end > input.length) return

    // crop input to length
    const partialToLength = input.slice(pos, end)

    // return successful result if it matches...
    if (matches(partialToLength)) return { length, value: partialToLength }

    // fail otherwise
  }
}

export function singleStringifyableTest(stringifyable: StringifyableTest, insensitive?: unknown): ValueTest {
  // return string test
  if (isType(stringifyable, 'string')) return singleStringTest(stringifyable, insensitive)

  // return number as string test is value is a number
  return singleStringTest(`${stringifyable}`)
}

export function stringTest(value: string, insensitive?: boolean): ValueTest
export function stringTest(value: number): ValueTest
export function stringTest(values: number[]): ValueTest
export function stringTest(values: StringifyableTest[], insensitive?: boolean): ValueTest
export function stringTest(stringifyable: StringifyableTest | StringifyableTest[], insensitive?: boolean): ValueTest
export function stringTest(stringifyable: StringifyableTest | StringifyableTest[], insensitive?: boolean): ValueTest {
  if (isArray(stringifyable)) return createOneOf(mapItemsWithArgs(stringifyable, singleStringifyableTest, insensitive))
  return singleStringifyableTest(stringifyable, insensitive)
}
