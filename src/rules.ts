import { regexpTest, stringTest } from './tests'
import { tokenizeCode } from './tokenize'
import type { LexerRule, RuleList } from './types/rule-types'
import type { Test, TestResult } from './types/test-types'
import type { TokenType } from './types/token-types'

type CreateRuleCallback<T extends TokenType> = (match: TestResult) => ReturnType<LexerRule<T>>

function createRule<T extends TokenType>(test: Test, callback: CreateRuleCallback<T>): LexerRule<T> {
  return (code, pos) => {
    const match = test(code, pos)
    if (!match) return
    return callback(match)
  }
}

export function rule<T extends TokenType>(test: Test, type: T): LexerRule<T> {
  return createRule(test, ({ value, length }) => {
    const token = { value, pos: 0, type }
    return { length, tokens: [token], done: true }
  })
}

export function parentRule<T extends TokenType = never>(test: Test, rules: RuleList<T>): LexerRule<T> {
  return createRule(test, ({ value }) => {
    const { tokens, length, done } = tokenizeCode(rules, value)
    if (!length) return
    return { tokens, length, done }
  })
}

export function regexpRule<T extends TokenType>(regexp: RegExp, type: T): LexerRule<T> {
  return rule(
    regexpTest(regexp),
    type,
  )
}

export function stringRule<T extends TokenType>(value: string, type: T, insensitive?: boolean): LexerRule<T> {
  return rule(
    stringTest(value, insensitive),
    type,
  )
}
