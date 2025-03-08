import { oneOfStringTest, regexpTest, stringTest } from './tests'
import { tokenizeCode } from './tokenize'
import type { CodeProcessingFunction, FalsyReturn } from './types/helper-types'
import type { LexerRule, RuleList, RuleResult, TokenRule, TokenRuleResult } from './types/rule-types'
import type { Test, TestResult } from './types/test-types'
import type { TokenType } from './types/token-types'
import type { TokenizerResult } from './types/types'

type CreateRuleCallback<R extends RuleResult<TokenType>> = (result: TestResult) => R | FalsyReturn

function createRule<R extends RuleResult<TokenType>>(test: Test, callback: CreateRuleCallback<R>): CodeProcessingFunction<R> {
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
    return tokenizeCode(rules, value)
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

export function oneOfStringRule<T extends TokenType>(values: string[], type: T, insensitive?: boolean) {
  return testRule(
    oneOfStringTest(values, insensitive),
    type,
  )
}
