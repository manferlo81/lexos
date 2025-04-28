import { ruleTest } from '../tests/rule-test'
import { singleTokenRule } from '../tools/single-token-rule'
import type { GetActualTokenType, GetFalsyTokenType, SingleTokenRuleOrTest } from '../types/private-types'
import type { SingleTokenRule } from '../types/rule-single-types'
import type { AnyTest, StringifyableTest, Test } from '../types/test-types'
import type { ValueTest } from '../types/test-value-types'
import type { GetTokenType, TokenType } from '../types/token-types'

export function testRule(getType: GetFalsyTokenType, test: Test): ValueTest
export function testRule(getType: GetFalsyTokenType, regexp: RegExp): ValueTest
export function testRule(getType: GetFalsyTokenType, value: number): ValueTest
export function testRule(getType: GetFalsyTokenType, values: number[]): ValueTest
export function testRule(getType: GetFalsyTokenType, value: string, insensitive?: boolean): ValueTest
export function testRule(getType: GetFalsyTokenType, values: StringifyableTest[], insensitive?: boolean): ValueTest
export function testRule(getType: GetFalsyTokenType, test: AnyTest, param?: unknown): ValueTest

export function testRule<T extends TokenType>(getType: GetActualTokenType<T>, test: Test): SingleTokenRule<T>
export function testRule<T extends TokenType>(getType: GetActualTokenType<T>, regexp: RegExp): SingleTokenRule<T>
export function testRule<T extends TokenType>(getType: GetActualTokenType<T>, value: number): SingleTokenRule<T>
export function testRule<T extends TokenType>(getType: GetActualTokenType<T>, values: number[]): SingleTokenRule<T>
export function testRule<T extends TokenType>(getType: GetActualTokenType<T>, value: string, insensitive?: boolean): SingleTokenRule<T>
export function testRule<T extends TokenType>(getType: GetActualTokenType<T>, values: StringifyableTest[], insensitive?: boolean): SingleTokenRule<T>
export function testRule<T extends TokenType>(getType: GetActualTokenType<T>, test: AnyTest, param?: unknown): SingleTokenRule<T>

export function testRule<T extends TokenType>(type: T, test: Test): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T, regexp: RegExp): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T, value: number): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T, values: number[]): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T, value: string, insensitive?: boolean): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T, values: StringifyableTest[], insensitive?: boolean): SingleTokenRule<T>
export function testRule<T extends TokenType>(type: T, test: AnyTest, param?: unknown): SingleTokenRule<T>

export function testRule<T extends TokenType>(type: T | GetTokenType<T>, test: AnyTest, param?: unknown): SingleTokenRuleOrTest<T>
export function testRule<T extends TokenType>(type: T | GetTokenType<T>, test: AnyTest, param?: unknown): SingleTokenRuleOrTest<T> {
  return singleTokenRule(
    type,
    ruleTest(test, param),
  )
}
