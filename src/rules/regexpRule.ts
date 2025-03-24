import { regexpTest } from '../tests/regexp-test'
import { singleTokenRule } from '../tools/single-token-rule'
import type { CodeProcessingFunction, FalsyReturn } from '../types/helper-types'
import type { SingleTokenRule, SingleTokenRuleResult } from '../types/single-rule-types'
import type { GetActualTokenType, GetNullishTokenType, GetTokenType, TokenType } from '../types/token-types'
import type { ValueTest, ValueTestResult } from '../types/value-test-types'

export function regexpRule(type: GetNullishTokenType, regexp: RegExp): ValueTest
export function regexpRule<T extends TokenType>(type: T | GetActualTokenType<T>, regexp: RegExp): SingleTokenRule<T>
export function regexpRule<T extends TokenType>(type: GetTokenType<T>, regexp: RegExp): SingleTokenRule<T> | ValueTest
export function regexpRule<T extends TokenType>(type: T | GetTokenType<T>, regexp: RegExp): CodeProcessingFunction<SingleTokenRuleResult<T> | ValueTestResult | FalsyReturn> {
  return singleTokenRule(
    type,
    regexpTest(regexp),
  )
}
