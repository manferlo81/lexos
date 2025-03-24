import { ruleTest } from '../tests/rule-test'
import { singleTokenRule } from '../tools/single-token-rule'
import type { CodeProcessingFunction, FalsyReturn } from '../types/helper-types'
import type { SingleTokenRule, SingleTokenRuleResult } from '../types/single-rule-types'
import type { AnyTest, StringifyableTest, Test } from '../types/test-types'
import type { GetActualTokenType, GetNullishTokenType, GetTokenType, TokenType } from '../types/token-types'
import type { ValueTest, ValueTestResult } from '../types/value-test-types'

export function testRule(type: GetNullishTokenType, test: Test): ValueTest
export function testRule(type: GetNullishTokenType, regexp: RegExp): ValueTest
export function testRule(type: GetNullishTokenType, value: number): ValueTest
export function testRule(type: GetNullishTokenType, values: number[]): ValueTest
export function testRule(type: GetNullishTokenType, value: string, insensitive?: boolean): ValueTest
export function testRule(type: GetNullishTokenType, values: StringifyableTest[], insensitive?: boolean): ValueTest
export function testRule(type: GetNullishTokenType, anyTest: AnyTest, param?: unknown): ValueTest

export function testRule<T extends TokenType>(type: T | GetActualTokenType<T>, test: Test): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T | GetActualTokenType<T>, regexp: RegExp): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T | GetActualTokenType<T>, value: number): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T | GetActualTokenType<T>, values: number[]): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T | GetActualTokenType<T>, value: string, insensitive?: boolean): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T | GetActualTokenType<T>, values: StringifyableTest[], insensitive?: boolean): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T | GetActualTokenType<T>, anyTest: AnyTest, param?: unknown): SingleTokenRule<T>

export function testRule<T extends TokenType>(type: T | GetTokenType<T>, anyTest: AnyTest, param?: unknown): SingleTokenRule<T> | ValueTest
export function testRule<T extends TokenType>(type: T | GetTokenType<T>, test: AnyTest, param?: unknown): CodeProcessingFunction<SingleTokenRuleResult<T> | ValueTestResult | FalsyReturn> {
  return singleTokenRule(
    type,
    ruleTest(test, param),
  )
}
