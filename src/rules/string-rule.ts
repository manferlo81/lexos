import { stringTest } from '../tests/string-test'
import { singleTokenRule } from '../tools/single-token-rule'
import type { GetActualTokenType, GetFalsyTokenType, SingleTokenRuleOrTest } from '../types/private-types'
import type { SingleTokenRule } from '../types/rule-single-types'
import type { StringifyableTest } from '../types/test-types'
import type { ValueTest } from '../types/test-value-types'
import type { GetTokenType, TokenType } from '../types/token-types'

// Using get type returning falsy

export function stringRule(getType: GetFalsyTokenType, value: number): ValueTest
export function stringRule(getType: GetFalsyTokenType, values: number[]): ValueTest
export function stringRule(getType: GetFalsyTokenType, value: string, insensitive?: boolean): ValueTest
export function stringRule(getType: GetFalsyTokenType, values: StringifyableTest[], insensitive?: boolean): ValueTest
export function stringRule(getType: GetFalsyTokenType, stringifyable: StringifyableTest | StringifyableTest[], insensitive?: boolean): ValueTest

// Using get type returning a type

export function stringRule<T extends TokenType, V extends number>(getType: GetActualTokenType<T>, value: V): SingleTokenRule<T, `${V}`>
export function stringRule<T extends TokenType, V extends number>(getType: GetActualTokenType<T>, values: V[]): SingleTokenRule<T, `${V}`>
export function stringRule<T extends TokenType>(getType: GetActualTokenType<T>, value: string, insensitive: true): SingleTokenRule<T>
export function stringRule<T extends TokenType, V extends string>(getType: GetActualTokenType<T>, value: V, insensitive?: false): SingleTokenRule<T, V>
export function stringRule<T extends TokenType>(getType: GetActualTokenType<T>, values: StringifyableTest[], insensitive: true): SingleTokenRule<T>
export function stringRule<T extends TokenType, V extends StringifyableTest>(getType: GetActualTokenType<T>, values: V[], insensitive?: false): SingleTokenRule<T, `${V}`>
export function stringRule<T extends TokenType>(getType: GetActualTokenType<T>, stringifyable: StringifyableTest | StringifyableTest[], insensitive?: boolean): SingleTokenRule<T>

// Using hard coded type

export function stringRule<T extends TokenType, V extends number>(type: T, value: V): SingleTokenRule<T, `${V}`>
export function stringRule<T extends TokenType, V extends number>(type: T, values: V[]): SingleTokenRule<T, `${V}`>
export function stringRule<T extends TokenType>(type: T, value: string, insensitive: true): SingleTokenRule<T>
export function stringRule<T extends TokenType, V extends string = string>(type: T, value: V, insensitive?: false): SingleTokenRule<T, V>
export function stringRule<T extends TokenType>(type: T, values: StringifyableTest[], insensitive: true): SingleTokenRule<T>
export function stringRule<T extends TokenType, V extends StringifyableTest>(type: T, values: V[], insensitive?: false): SingleTokenRule<T, `${V}`>
export function stringRule<T extends TokenType>(type: T, stringifyable: StringifyableTest | StringifyableTest[], insensitive?: boolean): SingleTokenRule<T>

// Generic case

export function stringRule<T extends TokenType>(type: T | GetTokenType<T>, stringifyable: StringifyableTest | StringifyableTest[], insensitive?: boolean): SingleTokenRuleOrTest<T>
export function stringRule<T extends TokenType>(type: T | GetTokenType<T>, stringifyable: StringifyableTest | StringifyableTest[], insensitive?: boolean): SingleTokenRuleOrTest<T> {
  return singleTokenRule(
    type,
    stringTest(stringifyable, insensitive),
  )
}
