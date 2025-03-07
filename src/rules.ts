import { regexpTest, stringTest } from './tests'
import { tokenizeCode } from './tokenize'
import type { RuleList, TokenRule } from './types/rule-types'
import type { Test, TestResult } from './types/test-types'
import type { TokenType } from './types/token-types'

type CreateRuleCallback<T extends TokenType> = (match: TestResult, partial: string) => ReturnType<TokenRule<T>>

function createRule<T extends TokenType>(test: Test, callback: CreateRuleCallback<T>): TokenRule<T> {
  return (partial) => {
    const match = test(partial)
    if (!match) return
    return callback(match, partial)
  }
}

export function rule<T extends TokenType>(test: Test, type: T): TokenRule<T> {
  return createRule(test, ({ value, length }) => {
    const token = { value, pos: 0, type }
    return { length, tokens: [token], done: true }
  })
}

export function parentRule<T extends TokenType = never>(test: Test, rules: RuleList<T>): TokenRule<T> {
  return createRule(test, ({ value }) => {
    const { tokens, length, done } = tokenizeCode(rules, value)
    if (!length) return
    return { tokens, length, done }
  })
}

export function regexpRule<T extends TokenType>(regexp: RegExp, type: T): TokenRule<T> {
  return rule(
    regexpTest(regexp),
    type,
  )
}

export function stringRule<T extends TokenType>(value: string, type: T, insensitive?: boolean): TokenRule<T> {
  return rule(
    stringTest(value, insensitive),
    type,
  )
}
