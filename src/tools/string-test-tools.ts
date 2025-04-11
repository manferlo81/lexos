import type { StringifyableTest } from '../types/test-types'
import type { ValueTest } from '../types/test-value-types'
import { isType } from './is'
import { createStringMatchFunction } from './match-string'

function singleStringTest(value: string, insensitive?: unknown): ValueTest {
  // throw if value length is zero
  const valueLength = value.length
  if (valueLength <= 0) throw Error('Zero length string test')

  // create match function
  const matches = createStringMatchFunction(value, insensitive)

  // return test
  return (input, pos) => {
    // compute end position
    const end = pos + valueLength

    // fail if there is not enough input to compare
    if (end > input.length) return

    // crop input to length
    const partialToLength = input.slice(pos, end)

    // return successful result if it matches...
    if (matches(partialToLength)) return { length: valueLength, value: partialToLength }

    // fail otherwise
  }
}

export function singleStringifyableTest(stringifyable: StringifyableTest, insensitive?: unknown): ValueTest {
  // return string test
  if (isType(stringifyable, 'string')) return singleStringTest(stringifyable, insensitive)

  // return number as string test is value is a number
  return singleStringTest(`${stringifyable}`)
}
