import { regexpTest, ruleTest, stringTest } from './tests'
import { singleTokenRule } from './tools/create-rule'
import type { SingleTokenRule } from './types/rule-types'
import type { AnyTest, StringifyableTest, Test } from './types/test-types'
import type { TokenType } from './types/token-types'

export function regexpRule<T extends TokenType>(type: T, regexp: RegExp): SingleTokenRule<T> {
  return singleTokenRule(
    type,
    regexpTest(regexp),
  )
}

export function stringRule<T extends TokenType>(type: T, value: number): SingleTokenRule<T>
export function stringRule<T extends TokenType>(type: T, values: number[]): SingleTokenRule<T>
export function stringRule<T extends TokenType>(type: T, value: string, insensitive?: boolean): SingleTokenRule<T>
export function stringRule<T extends TokenType>(type: T, values: StringifyableTest[], insensitive?: boolean): SingleTokenRule<T>
export function stringRule<T extends TokenType>(type: T, test: StringifyableTest | StringifyableTest[], insensitive?: boolean): SingleTokenRule<T>
export function stringRule<T extends TokenType>(type: T, value: StringifyableTest | StringifyableTest[], insensitive?: boolean): SingleTokenRule<T> {
  return singleTokenRule(
    type,
    stringTest(value, insensitive),
  )
}

export function testRule<T extends TokenType>(type: T, test: Test): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T, regexp: RegExp): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T, value: number): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T, values: number[]): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T, value: string, insensitive?: boolean): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T, values: StringifyableTest[], insensitive?: boolean): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T, anyTest: AnyTest, param?: unknown): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T, test: AnyTest, param?: unknown): SingleTokenRule<T> {
  return singleTokenRule(
    type,
    ruleTest(test, param),
  )
}
