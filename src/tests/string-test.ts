import { oneOf } from '../main/one-of'
import { isArray } from '../tools/is'
import { mapItemsWithArgs } from '../tools/map-items'
import { singleStringifyableTest } from '../tools/string-test-tools'
import type { StringifyableTest } from '../types/test-types'
import type { ValueTest } from '../types/test-value-types'

export function stringTest(value: string, insensitive?: boolean): ValueTest
export function stringTest(value: number): ValueTest
export function stringTest(values: number[]): ValueTest
export function stringTest(values: StringifyableTest[], insensitive?: boolean): ValueTest
export function stringTest(stringifyable: StringifyableTest | StringifyableTest[], insensitive?: boolean): ValueTest
export function stringTest(stringifyable: StringifyableTest | StringifyableTest[], insensitive?: boolean): ValueTest {
  if (isArray(stringifyable)) return oneOf(mapItemsWithArgs(stringifyable, singleStringifyableTest, insensitive))
  return singleStringifyableTest(stringifyable, insensitive)
}
