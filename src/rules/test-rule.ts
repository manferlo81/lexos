import { ruleTest } from '../tests/rule-test'
import { singleTokenRule } from '../tools/single-token-rule'
import type { GetActualTokenType, GetNullishTokenType, SingleTokenRuleOrTest } from '../types/private-types'
import type { SingleTokenRule } from '../types/single-rule-types'
import type { AnyTest, StringifyableTest, Test } from '../types/test-types'
import type { GetTokenType, TokenType } from '../types/token-types'
import type { ValueTest } from '../types/value-test-types'

export function testRule(type: GetNullishTokenType, test: Test): ValueTest
export function testRule(type: GetNullishTokenType, regexp: RegExp): ValueTest
export function testRule(type: GetNullishTokenType, value: number): ValueTest
export function testRule(type: GetNullishTokenType, values: number[]): ValueTest
export function testRule(type: GetNullishTokenType, value: string, insensitive?: boolean): ValueTest
export function testRule(type: GetNullishTokenType, values: StringifyableTest[], insensitive?: boolean): ValueTest
export function testRule(type: GetNullishTokenType, test: AnyTest, param?: unknown): ValueTest

export function testRule<T extends TokenType>(type: T | GetActualTokenType<T>, test: Test): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T | GetActualTokenType<T>, regexp: RegExp): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T | GetActualTokenType<T>, value: number): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T | GetActualTokenType<T>, values: number[]): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T | GetActualTokenType<T>, value: string, insensitive?: boolean): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T | GetActualTokenType<T>, values: StringifyableTest[], insensitive?: boolean): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T | GetActualTokenType<T>, test: AnyTest, param?: unknown): SingleTokenRule<T>

export function testRule<T extends TokenType>(type: T | GetTokenType<T>, test: AnyTest, param?: unknown): SingleTokenRuleOrTest<T>
export function testRule<T extends TokenType>(type: T | GetTokenType<T>, test: AnyTest, param?: unknown): SingleTokenRuleOrTest<T> {
  return singleTokenRule(
    type,
    ruleTest(test, param),
  )
}
