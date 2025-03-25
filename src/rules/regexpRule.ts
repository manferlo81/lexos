import { regexpTest } from '../tests/regexp-test'
import { singleTokenRule } from '../tools/single-token-rule'
import type { GetActualTokenType, GetNullishTokenType, SingleTokenRuleOrTest } from '../types/private-types'
import type { SingleTokenRule } from '../types/single-rule-types'
import type { GetTokenType, TokenType } from '../types/token-types'
import type { ValueTest } from '../types/value-test-types'

export function regexpRule(type: GetNullishTokenType, regexp: RegExp): ValueTest
export function regexpRule<T extends TokenType>(type: T | GetActualTokenType<T>, regexp: RegExp): SingleTokenRule<T>
export function regexpRule<T extends TokenType>(type: GetTokenType<T>, regexp: RegExp): SingleTokenRuleOrTest<T>
export function regexpRule<T extends TokenType>(type: T | GetTokenType<T>, regexp: RegExp): SingleTokenRuleOrTest<T> {
  return singleTokenRule(
    type,
    regexpTest(regexp),
  )
}
