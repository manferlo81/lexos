import { createOneOf } from '../one-of'
import { isArray, isType } from '../tools/is'
import { mapTests } from '../tools/map-tests'
import type { StringifyableTest, Test } from '../types/test-types'

type StringMatchFunction = (partial: string) => boolean

function createStringMatchFunction(value: string, insensitive?: unknown): StringMatchFunction {
  // return case sensitive string match function
  if (!insensitive) return (partial: string) => partial === value

  // make value insensitive
  const referenceValue = value.toLowerCase()

  // return case insensitive string match function
  return (partial: string) => partial.toLowerCase() === referenceValue
}

function singleStringTest(value: string, insensitive?: unknown): Test {
  // throw if value length is zero
  const length = value.length
  if (!length) throw Error('Zero length string test')

  // create match function
  const matches = createStringMatchFunction(value, insensitive)

  // return test
  return (input, currentPosition) => {
    // compute end position
    const end = currentPosition + length

    // fail if there is not enough input to compare
    if (end > input.length) return

    // crop input to length
    const partialToLength = input.substring(currentPosition, end)

    // return successful result if it matches...
    if (matches(partialToLength)) return { length, value: partialToLength }

    // fail otherwise
  }
}

export function singleStringifyableTest(value: StringifyableTest, insensitive?: unknown): Test {
  // return string test
  if (isType(value, 'string')) return singleStringTest(value, insensitive)

  // return number as string test is value is a number
  return singleStringTest(`${value}`)
}

export function stringTest(value: number): Test
export function stringTest(values: number[]): Test
export function stringTest(value: string, insensitive?: boolean): Test
export function stringTest(values: StringifyableTest[], insensitive?: boolean): Test
export function stringTest(test: StringifyableTest | StringifyableTest[], insensitive?: boolean): Test
export function stringTest(test: StringifyableTest | StringifyableTest[], insensitive?: boolean): Test {
  if (isArray(test)) return createOneOf(mapTests(test, singleStringifyableTest, insensitive))
  return singleStringifyableTest(test, insensitive)
}
