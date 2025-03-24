import { stringTest } from '../tests/string-test'
import { singleTokenRule } from '../tools/single-token-rule'
import type { CodeProcessingFunction, FalsyReturn } from '../types/helper-types'
import type { SingleTokenRule, SingleTokenRuleResult } from '../types/single-rule-types'
import type { StringifyableTest } from '../types/test-types'
import type { GetActualTokenType, GetNullishTokenType, GetTokenType, TokenType } from '../types/token-types'
import type { ValueTest, ValueTestResult } from '../types/value-test-types'

export function stringRule(type: GetNullishTokenType, value: number): ValueTest
export function stringRule(type: GetNullishTokenType, values: number[]): ValueTest
export function stringRule(type: GetNullishTokenType, value: string, insensitive?: boolean): ValueTest
export function stringRule(type: GetNullishTokenType, values: StringifyableTest[], insensitive?: boolean): ValueTest
export function stringRule(type: GetNullishTokenType, test: StringifyableTest | StringifyableTest[], insensitive?: boolean): ValueTest

export function stringRule<T extends TokenType>(type: T | GetActualTokenType<T>, value: number): SingleTokenRule<T>
export function stringRule<T extends TokenType>(type: T | GetActualTokenType<T>, values: number[]): SingleTokenRule<T>
export function stringRule<T extends TokenType>(type: T | GetActualTokenType<T>, value: string, insensitive?: boolean): SingleTokenRule<T>
export function stringRule<T extends TokenType>(type: T | GetActualTokenType<T>, values: StringifyableTest[], insensitive?: boolean): SingleTokenRule<T>
export function stringRule<T extends TokenType>(type: T | GetActualTokenType<T>, test: StringifyableTest | StringifyableTest[], insensitive?: boolean): SingleTokenRule<T>

export function stringRule<T extends TokenType>(type: T | GetTokenType<T>, test: StringifyableTest | StringifyableTest[], insensitive?: boolean): SingleTokenRule<T> | ValueTest
export function stringRule<T extends TokenType>(type: T | GetTokenType<T>, value: StringifyableTest | StringifyableTest[], insensitive?: boolean): CodeProcessingFunction<SingleTokenRuleResult<T> | ValueTestResult | FalsyReturn> {
  return singleTokenRule(
    type,
    stringTest(value, insensitive),
  )
}
