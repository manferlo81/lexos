import { stringTest } from '../tests/string-test'
import { singleTokenRule } from '../tools/single-token-rule'
import type { GetActualTokenType, GetNullishTokenType, SingleTokenRuleOrTest } from '../types/private-types'
import type { SingleTokenRule } from '../types/rule-single-types'
import type { StringifyableTest } from '../types/test-types'
import type { ValueTest } from '../types/test-value-types'
import type { GetTokenType, TokenType } from '../types/token-types'

export function stringRule(type: GetNullishTokenType, value: number): ValueTest
export function stringRule(type: GetNullishTokenType, values: number[]): ValueTest
export function stringRule(type: GetNullishTokenType, value: string, insensitive?: boolean): ValueTest
export function stringRule(type: GetNullishTokenType, values: StringifyableTest[], insensitive?: boolean): ValueTest
export function stringRule(type: GetNullishTokenType, stringifyable: StringifyableTest | StringifyableTest[], insensitive?: boolean): ValueTest

export function stringRule<T extends TokenType>(type: T | GetActualTokenType<T>, value: number): SingleTokenRule<T>
export function stringRule<T extends TokenType>(type: T | GetActualTokenType<T>, values: number[]): SingleTokenRule<T>
export function stringRule<T extends TokenType>(type: T | GetActualTokenType<T>, value: string, insensitive?: boolean): SingleTokenRule<T>
export function stringRule<T extends TokenType>(type: T | GetActualTokenType<T>, values: StringifyableTest[], insensitive?: boolean): SingleTokenRule<T>
export function stringRule<T extends TokenType>(type: T | GetActualTokenType<T>, stringifyable: StringifyableTest | StringifyableTest[], insensitive?: boolean): SingleTokenRule<T>

export function stringRule<T extends TokenType>(type: T | GetTokenType<T>, stringifyable: StringifyableTest | StringifyableTest[], insensitive?: boolean): SingleTokenRuleOrTest<T>
export function stringRule<T extends TokenType>(type: T | GetTokenType<T>, stringifyable: StringifyableTest | StringifyableTest[], insensitive?: boolean): SingleTokenRuleOrTest<T> {
  return singleTokenRule(
    type,
    stringTest(stringifyable, insensitive),
  )
}
