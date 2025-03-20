import { createOneOf } from '../one-of'
import { isArray, isType } from '../tools/is'
import { mapTests } from '../tools/map-tests'
import type { AnyTest, StringifyableTest, Test } from '../types/test-types'
import { regexpTest } from './regexp-test'
import { singleStringifyableTest } from './string-test'

export function ruleTest(test: Test): Test
export function ruleTest(regexp: RegExp): Test
export function ruleTest(value: number): Test
export function ruleTest(values: number[]): Test
export function ruleTest(value: string, insensitive?: boolean): Test
export function ruleTest(values: StringifyableTest[], insensitive?: boolean): Test
export function ruleTest(anyTest: AnyTest, param?: unknown): Test
export function ruleTest(test: AnyTest, param?: unknown): Test {

  // return function as test if it's a function
  if (isType(test, 'function')) return test

  // return string test if it's a string
  if (isType(test, 'string', 'number')) return singleStringifyableTest(test, param)

  // return one-of test if it's an array
  if (isArray(test)) return createOneOf(mapTests(test, ruleTest, param))

  // return regexp test if it's a regexp
  return regexpTest(test)

}
