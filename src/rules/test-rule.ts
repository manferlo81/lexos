import { ruleTest } from '../tests/rule-test'
import { singleTokenRule } from '../tools/single-token-rule'
import type { CodeProcessingFunction, FalsyReturn } from '../types/helper-types'
import type { SingleTokenRule, SingleTokenRuleResult } from '../types/single-rule-types'
import type { AnyTest, StringifyableTest, Test, TestResult } from '../types/test-types'
import type { GetActualTokenType, GetNullishTokenType, GetTokenType, TokenType } from '../types/token-types'

export function testRule(type: GetNullishTokenType, test: Test): Test
export function testRule(type: GetNullishTokenType, regexp: RegExp): Test
export function testRule(type: GetNullishTokenType, value: number): Test
export function testRule(type: GetNullishTokenType, values: number[]): Test
export function testRule(type: GetNullishTokenType, value: string, insensitive?: boolean): Test
export function testRule(type: GetNullishTokenType, values: StringifyableTest[], insensitive?: boolean): Test
export function testRule(type: GetNullishTokenType, anyTest: AnyTest, param?: unknown): Test

export function testRule<T extends TokenType>(type: T | GetActualTokenType<T>, test: Test): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T | GetActualTokenType<T>, regexp: RegExp): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T | GetActualTokenType<T>, value: number): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T | GetActualTokenType<T>, values: number[]): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T | GetActualTokenType<T>, value: string, insensitive?: boolean): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T | GetActualTokenType<T>, values: StringifyableTest[], insensitive?: boolean): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T | GetActualTokenType<T>, anyTest: AnyTest, param?: unknown): SingleTokenRule<T>

export function testRule<T extends TokenType>(type: T | GetTokenType<T>, anyTest: AnyTest, param?: unknown): SingleTokenRule<T> | Test
export function testRule<T extends TokenType>(type: T | GetTokenType<T>, test: AnyTest, param?: unknown): CodeProcessingFunction<SingleTokenRuleResult<T> | TestResult | FalsyReturn> {
  return singleTokenRule(
    type,
    ruleTest(test, param),
  )
}
