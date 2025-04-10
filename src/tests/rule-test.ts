import { oneOf } from '../main/one-of'
import { isArray, isType } from '../tools/is'
import { mapItemsWithArgs } from '../tools/map-items'
import { singleStringifyableTest } from '../tools/string-test-tools'
import type { AnyTest, StringifyableTest, Test } from '../types/test-types'
import type { ValueTest } from '../types/test-value-types'
import { regexpTest } from './regexp-test'

export function ruleTest<T extends Test>(test: T): T
export function ruleTest(regexp: RegExp): ValueTest
export function ruleTest(value: number): ValueTest
export function ruleTest(values: number[]): ValueTest
export function ruleTest(value: string, insensitive?: boolean): ValueTest
export function ruleTest(values: StringifyableTest[], insensitive?: boolean): ValueTest
export function ruleTest(anyTest: AnyTest, param?: unknown): Test
export function ruleTest(test: AnyTest, param?: unknown): Test {

  // return function as test if it's a function
  if (isType(test, 'function')) return test

  // return string test if it's a string
  if (isType(test, 'string', 'number')) return singleStringifyableTest(test, param)

  // return one-of test if it's an array
  if (isArray(test)) return oneOf(mapItemsWithArgs(test, ruleTest, param))

  // return regexp test if it's a regexp
  return regexpTest(test)

}
