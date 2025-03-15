import { stringTest } from './tests'
import { createRule } from './tools/create-rule'
import { createGetNextToken } from './tools/get-next-token'
import { unifyRules } from './tools/unify-rules'
import type { MultiTokenRule, SingleTokenRule, SingleTokenRuleResult, UnifiableRules } from './types/rule-types'
import type { AnyTest, StringifyableTest } from './types/test-types'
import type { TokenType } from './types/token-types'

export function testRule<T extends TokenType>(test: AnyTest, type: T): SingleTokenRule<T> {
  return createRule(test, ({ length, value }): SingleTokenRuleResult<T> => {
    return { length, token: { type, value } }
  })
}

export function regexpRule<T extends TokenType>(regexp: RegExp, type: T): SingleTokenRule<T> {
  return testRule(
    regexp,
    type,
  )
}

export function stringRule<T extends TokenType>(value: StringifyableTest | StringifyableTest[], type: T, insensitive?: boolean): SingleTokenRule<T> {
  return testRule(
    stringTest(value, insensitive),
    type,
  )
}

export function lexerRule<T extends TokenType = never, L = never>(test: AnyTest, rules: UnifiableRules<T, L>, lastToken?: undefined): MultiTokenRule<T, L>
export function lexerRule<T extends TokenType = never, L = never, X extends TokenType = never>(test: AnyTest, rules: UnifiableRules<T, L>, lastToken: X): MultiTokenRule<T, L | X>
export function lexerRule<T extends TokenType = never, L = never, X = never>(test: AnyTest, rules: UnifiableRules<T, L>, lastToken: X): MultiTokenRule<T, L | X>
export function lexerRule<T extends TokenType = never, L = never>(test: AnyTest, rules: UnifiableRules<T, L>, lastToken = null): MultiTokenRule<T, L | typeof lastToken> {
  // unify rules
  const unifiedRule = unifyRules(rules)
  // return rule
  return createRule(test, ({ length, value }, currentPosition) => {
    const getToken = createGetNextToken(value, unifiedRule, currentPosition, lastToken)
    return { length, getToken }
  })
}
