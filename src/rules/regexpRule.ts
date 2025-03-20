import { regexpTest } from '../tests/regexp-test'
import { singleTokenRule } from '../tools/single-token-rule'
import type { CodeProcessingFunction, FalsyReturn } from '../types/helper-types'
import type { SingleTokenRule, SingleTokenRuleResult } from '../types/single-rule-types'
import type { Test, TestResult } from '../types/test-types'
import type { GetActualTokenType, GetNullishTokenType, GetTokenType, TokenType } from '../types/token-types'

export function regexpRule(type: GetNullishTokenType, regexp: RegExp): Test
export function regexpRule<T extends TokenType>(type: T | GetActualTokenType<T>, regexp: RegExp): SingleTokenRule<T>
export function regexpRule<T extends TokenType>(type: GetTokenType<T>, regexp: RegExp): SingleTokenRule<T> | Test
export function regexpRule<T extends TokenType>(type: T | GetTokenType<T>, regexp: RegExp): CodeProcessingFunction<SingleTokenRuleResult<T> | TestResult | FalsyReturn> {
  return singleTokenRule(
    type,
    regexpTest(regexp),
  )
}
