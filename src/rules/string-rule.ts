import { stringTest } from '../tests/string-test'
import { singleTokenRule } from '../tools/single-token-rule'
import type { GetActualTokenType, GetFalsyTokenType, SingleTokenRuleOrTest } from '../types/private-types'
import type { SingleTokenRule } from '../types/rule-single-types'
import type { StringifyableTest } from '../types/test-types'
import type { ValueTest } from '../types/test-value-types'
import type { GetTokenType, TokenType } from '../types/token-types'

export function stringRule(getType: GetFalsyTokenType, value: number): ValueTest
export function stringRule(getType: GetFalsyTokenType, values: number[]): ValueTest
export function stringRule(getType: GetFalsyTokenType, value: string, insensitive?: boolean): ValueTest
export function stringRule(getType: GetFalsyTokenType, values: StringifyableTest[], insensitive?: boolean): ValueTest
export function stringRule(getType: GetFalsyTokenType, stringifyable: StringifyableTest | StringifyableTest[], insensitive?: boolean): ValueTest

export function stringRule<T extends TokenType>(getType: GetActualTokenType<T>, value: number): SingleTokenRule<T>
export function stringRule<T extends TokenType>(getType: GetActualTokenType<T>, values: number[]): SingleTokenRule<T>
export function stringRule<T extends TokenType>(getType: GetActualTokenType<T>, value: string, insensitive?: boolean): SingleTokenRule<T>
export function stringRule<T extends TokenType>(getType: GetActualTokenType<T>, values: StringifyableTest[], insensitive?: boolean): SingleTokenRule<T>
export function stringRule<T extends TokenType>(getType: GetActualTokenType<T>, stringifyable: StringifyableTest | StringifyableTest[], insensitive?: boolean): SingleTokenRule<T>

export function stringRule<T extends TokenType>(type: T, value: number): SingleTokenRule<T>
export function stringRule<T extends TokenType>(type: T, values: number[]): SingleTokenRule<T>
export function stringRule<T extends TokenType>(type: T, value: string, insensitive?: boolean): SingleTokenRule<T>
export function stringRule<T extends TokenType>(type: T, values: StringifyableTest[], insensitive?: boolean): SingleTokenRule<T>
export function stringRule<T extends TokenType>(type: T, stringifyable: StringifyableTest | StringifyableTest[], insensitive?: boolean): SingleTokenRule<T>

export function stringRule<T extends TokenType>(type: T | GetTokenType<T>, stringifyable: StringifyableTest | StringifyableTest[], insensitive?: boolean): SingleTokenRuleOrTest<T>
export function stringRule<T extends TokenType>(type: T | GetTokenType<T>, stringifyable: StringifyableTest | StringifyableTest[], insensitive?: boolean): SingleTokenRuleOrTest<T> {
  return singleTokenRule(
    type,
    stringTest(stringifyable, insensitive),
  )
}
