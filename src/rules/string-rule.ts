import { stringTest } from '../tests/string-test'
import { singleTokenRule } from '../tools/single-token-rule'
import type { CodeProcessingFunction, FalsyReturn } from '../types/helper-types'
import type { SingleTokenRule, SingleTokenRuleResult } from '../types/single-rule-types'
import type { StringifyableTest, Test, TestResult } from '../types/test-types'
import type { GetActualTokenType, GetNullishTokenType, GetTokenType, TokenType } from '../types/token-types'

export function stringRule(type: GetNullishTokenType, value: number): Test
export function stringRule(type: GetNullishTokenType, values: number[]): Test
export function stringRule(type: GetNullishTokenType, value: string, insensitive?: boolean): Test
export function stringRule(type: GetNullishTokenType, values: StringifyableTest[], insensitive?: boolean): Test
export function stringRule(type: GetNullishTokenType, test: StringifyableTest | StringifyableTest[], insensitive?: boolean): Test

export function stringRule<T extends TokenType>(type: T | GetActualTokenType<T>, value: number): SingleTokenRule<T>
export function stringRule<T extends TokenType>(type: T | GetActualTokenType<T>, values: number[]): SingleTokenRule<T>
export function stringRule<T extends TokenType>(type: T | GetActualTokenType<T>, value: string, insensitive?: boolean): SingleTokenRule<T>
export function stringRule<T extends TokenType>(type: T | GetActualTokenType<T>, values: StringifyableTest[], insensitive?: boolean): SingleTokenRule<T>
export function stringRule<T extends TokenType>(type: T | GetActualTokenType<T>, test: StringifyableTest | StringifyableTest[], insensitive?: boolean): SingleTokenRule<T>

export function stringRule<T extends TokenType>(type: T | GetTokenType<T>, test: StringifyableTest | StringifyableTest[], insensitive?: boolean): SingleTokenRule<T> | Test
export function stringRule<T extends TokenType>(type: T | GetTokenType<T>, value: StringifyableTest | StringifyableTest[], insensitive?: boolean): CodeProcessingFunction<SingleTokenRuleResult<T> | TestResult | FalsyReturn> {
  return singleTokenRule(
    type,
    stringTest(value, insensitive),
  )
}
