import { createGetNextToken } from './get-next-token'
import { oneOfRule } from './one-of'
import { oneOfStringTest, regexpTest, stringTest } from './tests'
import type { CodeProcessingFunction, Void } from './types/internal/helper-types'
import type { MultiTokenRule, Rule, SingleTokenRule, SingleTokenRuleResult } from './types/rule-types'
import type { Test, TestResult } from './types/test-types'
import type { TokenType } from './types/token-types'

type CreateRuleResult<R> = (result: TestResult, currentPosition: number) => R

function createRule<R>(test: Test, createResult: CreateRuleResult<R>): CodeProcessingFunction<R | Void> {
  // return rule
  return (input, currentPosition) => {
    // test code at current position
    const result = test(input, currentPosition)

    // return no match if test didn't match
    if (!result) return

    // callback result creator function
    return createResult(result, currentPosition)
  }
}

export function testRule<T extends TokenType>(test: Test, type: T): SingleTokenRule<T> {
  // return rule
  return createRule(test, ({ length, value }): SingleTokenRuleResult<T> => {
    return { length, token: { type, value } }
  })
}

export function regexpRule<T extends TokenType>(regexp: RegExp, type: T): SingleTokenRule<T> {
  // create test
  const test = regexpTest(regexp)
  // return rule
  return testRule(test, type)
}

export function stringRule<T extends TokenType>(value: string, type: T, insensitive?: boolean): SingleTokenRule<T> {
  // create test
  const test = stringTest(value, insensitive)
  // return rule
  return testRule(test, type)
}

export function oneOfStringRule<T extends TokenType>(values: string[], type: T, insensitive?: boolean): SingleTokenRule<T> {
  // create one-of test function from string list
  const test = oneOfStringTest(values, insensitive)
  // return rule
  return testRule(test, type)
}

export function lexerRule<T extends TokenType = never>(test: Test, rules: Array<Rule<T>>): MultiTokenRule<T> {
  // return rule
  return createRule(test, ({ length, value }, currentPosition) => {
    const getToken = createGetNextToken(value, oneOfRule(rules), currentPosition, null)
    return { length, getToken }
  })
}

export function regexpLexerRule<T extends TokenType = never>(regexp: RegExp, rules: Array<Rule<T>>) {
  // return rule
  return lexerRule(
    regexpTest(regexp),
    rules,
  )
}
