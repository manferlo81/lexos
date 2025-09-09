import { stringTest } from '../tests/string-test'
import { singleTokenRule } from '../tools/single-token-rule'
import type { GetActualTokenType, GetFalsyTokenType, SingleTokenRuleOrTest } from '../types/private-types'
import type { SingleTokenRule } from '../types/rule-single-types'
import type { StringifyableTest } from '../types/test-types'
import type { ValueTest } from '../types/test-value-types'
import type { GetTokenType, TokenType } from '../types/token-types'

// Using get type returning falsy

export function stringRule(getType: GetFalsyTokenType, number: number): ValueTest
export function stringRule(getType: GetFalsyTokenType, numbers: readonly number[]): ValueTest
export function stringRule(getType: GetFalsyTokenType, value: string, insensitive?: boolean): ValueTest
export function stringRule(getType: GetFalsyTokenType, values: readonly StringifyableTest[], insensitive?: boolean): ValueTest
export function stringRule(getType: GetFalsyTokenType, stringifyable: StringifyableTest | readonly StringifyableTest[], insensitive?: boolean): ValueTest

// Using get type returning a type

export function stringRule<T extends TokenType, N extends number>(getType: GetActualTokenType<T>, number: N): SingleTokenRule<T, `${N}`>
export function stringRule<T extends TokenType, L extends readonly number[]>(getType: GetActualTokenType<T>, numbers: L): SingleTokenRule<T, `${L[number]}`>
export function stringRule<T extends TokenType, N extends number>(getType: GetActualTokenType<T>, numbers: readonly N[]): SingleTokenRule<T, `${N}`>
export function stringRule<T extends TokenType>(getType: GetActualTokenType<T>, value: string, insensitive: true): SingleTokenRule<T>
export function stringRule<T extends TokenType, S extends string>(getType: GetActualTokenType<T>, value: S, insensitive?: false): SingleTokenRule<T, S>
export function stringRule<T extends TokenType>(getType: GetActualTokenType<T>, stringifyables: readonly StringifyableTest[], insensitive: true): SingleTokenRule<T>
export function stringRule<T extends TokenType, L extends readonly StringifyableTest[]>(getType: GetActualTokenType<T>, stringifyables: L, insensitive?: false): SingleTokenRule<T, `${L[number]}`>
export function stringRule<T extends TokenType, S extends StringifyableTest>(getType: GetActualTokenType<T>, stringifyables: readonly S[], insensitive?: false): SingleTokenRule<T, `${S}`>
export function stringRule<T extends TokenType>(getType: GetActualTokenType<T>, stringifyable: StringifyableTest | readonly StringifyableTest[], insensitive?: boolean): SingleTokenRule<T>

// Using hard coded type

export function stringRule<T extends TokenType, N extends number>(type: T, number: N): SingleTokenRule<T, `${N}`>
export function stringRule<T extends TokenType, L extends readonly number[]>(type: T, numbers: L): SingleTokenRule<T, `${L[number]}`>
export function stringRule<T extends TokenType, N extends number>(type: T, numbers: readonly N[]): SingleTokenRule<T, `${N}`>
export function stringRule<T extends TokenType>(type: T, value: string, insensitive: true): SingleTokenRule<T>
export function stringRule<T extends TokenType, S extends string>(type: T, value: S, insensitive?: false): SingleTokenRule<T, S>
export function stringRule<T extends TokenType>(type: T, stringifyables: readonly StringifyableTest[], insensitive: true): SingleTokenRule<T>
export function stringRule<T extends TokenType, L extends readonly StringifyableTest[]>(type: T, stringifyables: L, insensitive?: false): SingleTokenRule<T, `${L[number]}`>
export function stringRule<T extends TokenType, S extends StringifyableTest>(type: T, stringifyables: readonly S[], insensitive?: false): SingleTokenRule<T, `${S}`>
export function stringRule<T extends TokenType>(type: T, stringifyable: StringifyableTest | readonly StringifyableTest[], insensitive?: boolean): SingleTokenRule<T>

// Generic case

export function stringRule<T extends TokenType>(type: T | GetTokenType<T>, stringifyable: StringifyableTest | readonly StringifyableTest[], insensitive?: boolean): SingleTokenRuleOrTest<T>
export function stringRule<T extends TokenType>(type: T | GetTokenType<T>, stringifyable: StringifyableTest | readonly StringifyableTest[], insensitive?: boolean): SingleTokenRuleOrTest<T> {
  return singleTokenRule(
    type,
    stringTest(stringifyable, insensitive),
  )
}
