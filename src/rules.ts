import { regexpTest, stringTest } from './tests'
import { tokenizeCode } from './tokenize'
import type { CodeProcessingFunction, FalsyReturn } from './types/helper-types'
import type { LexerRule, RuleList, RuleResult, TokenRule, TokenRuleResult } from './types/rule-types'
import type { ExtendedTestResult, Test } from './types/test-types'
import type { TokenType } from './types/token-types'
import type { TokenizerResult } from './types/types'

function createRule<T extends TokenType, R extends RuleResult<T>>(test: Test, callback: (result: ExtendedTestResult) => R | FalsyReturn): CodeProcessingFunction<R> {
  return (code, pos) => {
    const result = test(code, pos)
    if (!result) return
    return callback(result)
  }
}

export function testRule<T extends TokenType>(test: Test, type: T): TokenRule<T> {
  return createRule(test, ({ value, length }): TokenRuleResult<T> => {
    return { type, value, length }
  })
}

export function lexerRule<T extends TokenType = never>(test: Test, rules: RuleList<T>): LexerRule<T> {
  return createRule(test, ({ value }): TokenizerResult<T> | FalsyReturn => {
    const { tokens, length, done } = tokenizeCode(rules, value)
    if (!length) return
    return { tokens, length, done }
  })
}

export function regexpRule<T extends TokenType>(regexp: RegExp, type: T): TokenRule<T> {
  return testRule(
    regexpTest(regexp),
    type,
  )
}

export function stringRule<T extends TokenType>(value: string, type: T, insensitive?: boolean): TokenRule<T> {
  return testRule(
    stringTest(value, insensitive),
    type,
  )
}
