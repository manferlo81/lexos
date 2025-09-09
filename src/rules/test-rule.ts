import { ruleTest } from '../tests/rule-test'
import { singleTokenRule } from '../tools/single-token-rule'
import type { GetActualTokenType, GetFalsyTokenType, SingleTokenRuleOrTest } from '../types/private-types'
import type { SingleTokenRule } from '../types/rule-single-types'
import type { AnyTest, StringifyableTest, Test } from '../types/test-types'
import type { ValueTest } from '../types/test-value-types'
import type { GetTokenType, TokenType } from '../types/token-types'

// Using get type returning falsy

export function testRule(getType: GetFalsyTokenType, test: Test): ValueTest
export function testRule(getType: GetFalsyTokenType, regexp: RegExp): ValueTest
export function testRule(getType: GetFalsyTokenType, value: number): ValueTest
export function testRule(getType: GetFalsyTokenType, values: readonly number[]): ValueTest
export function testRule(getType: GetFalsyTokenType, value: string, insensitive?: boolean): ValueTest
export function testRule(getType: GetFalsyTokenType, values: readonly StringifyableTest[], insensitive?: boolean): ValueTest
export function testRule(getType: GetFalsyTokenType, test: AnyTest, param?: unknown): ValueTest

// Using get type returning a type

export function testRule<T extends TokenType>(getType: GetActualTokenType<T>, test: Test): SingleTokenRule<T>
export function testRule<T extends TokenType>(getType: GetActualTokenType<T>, regexp: RegExp): SingleTokenRule<T>
export function testRule<T extends TokenType, V extends number>(getType: GetActualTokenType<T>, number: V): SingleTokenRule<T, `${V}`>
export function testRule<T extends TokenType, V extends readonly number[]>(getType: GetActualTokenType<T>, numbers: V): SingleTokenRule<T, `${V[number]}`>
export function testRule<T extends TokenType, V extends number>(getType: GetActualTokenType<T>, numbers: readonly V[]): SingleTokenRule<T, `${V}`>
export function testRule<T extends TokenType>(getType: GetActualTokenType<T>, value: string, insensitive: true): SingleTokenRule<T>
export function testRule<T extends TokenType, V extends string>(getType: GetActualTokenType<T>, value: V, insensitive?: false): SingleTokenRule<T, V>
export function testRule<T extends TokenType>(getType: GetActualTokenType<T>, stringifyables: readonly StringifyableTest[], insensitive: true): SingleTokenRule<T>
export function testRule<T extends TokenType, V extends readonly StringifyableTest[]>(getType: GetActualTokenType<T>, stringifyables: V, insensitive?: false): SingleTokenRule<T, `${V[number]}`>
export function testRule<T extends TokenType, V extends StringifyableTest>(getType: GetActualTokenType<T>, stringifyables: readonly V[], insensitive?: false): SingleTokenRule<T, `${V}`>
export function testRule<T extends TokenType>(getType: GetActualTokenType<T>, test: AnyTest, param?: unknown): SingleTokenRule<T>

// Using hard coded type

export function testRule<T extends TokenType>(type: T, test: Test): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T, regexp: RegExp): SingleTokenRule<T>
export function testRule<T extends TokenType, V extends number>(type: T, number: V): SingleTokenRule<T, `${V}`>
export function testRule<T extends TokenType, V extends readonly number[]>(type: T, numbers: V): SingleTokenRule<T, `${V[number]}`>
export function testRule<T extends TokenType, V extends number>(type: T, numbers: readonly V[]): SingleTokenRule<T, `${V}`>
export function testRule<T extends TokenType>(type: T, value: string, insensitive: true): SingleTokenRule<T>
export function testRule<T extends TokenType, V extends string>(type: T, value: V, insensitive?: false): SingleTokenRule<T, V>
export function testRule<T extends TokenType>(type: T, stringifyables: readonly StringifyableTest[], insensitive: true): SingleTokenRule<T>
export function testRule<T extends TokenType, V extends readonly StringifyableTest[]>(type: T, stringifyables: V, insensitive?: false): SingleTokenRule<T, `${V[number]}`>
export function testRule<T extends TokenType, V extends StringifyableTest>(type: T, stringifyables: readonly V[], insensitive?: false): SingleTokenRule<T, `${V}`>
export function testRule<T extends TokenType>(type: T, test: AnyTest, param?: unknown): SingleTokenRule<T>

// Generic case

export function testRule<T extends TokenType>(type: T | GetTokenType<T>, test: AnyTest, param?: unknown): SingleTokenRuleOrTest<T>
export function testRule<T extends TokenType>(type: T | GetTokenType<T>, test: AnyTest, param?: unknown): SingleTokenRuleOrTest<T> {
  return singleTokenRule(
    type,
    ruleTest(test, param),
  )
}
