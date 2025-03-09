import { oneOfStringTest, regexpTest, stringTest } from './tests'
import { tokenizeCode } from './tokenize'
import type { CodeProcessingFunction, FalsyReturn } from './types/helper-types'
import type { LexerRule, RuleList, RuleResult, TokenRule, TokenRuleResult } from './types/rule-types'
import type { Test, TestResult } from './types/test-types'
import type { TokenType } from './types/token-types'
import type { TokenizerResult } from './types/types'

type CreateRuleResult<R extends RuleResult<TokenType>> = (result: TestResult) => R | FalsyReturn

function createRule<R extends RuleResult<TokenType>>(test: Test, createResult: CreateRuleResult<R>): CodeProcessingFunction<R> {
  // return rule
  return (code, currentPos) => {
    // test code at current position
    const result = test(code, currentPos)

    // return no match if test didn't match
    if (!result) return

    // callback result creator function
    return createResult(result)
  }
}

export function testRule<T extends TokenType>(test: Test, type: T): TokenRule<T> {
  // create result function
  const createResult: CreateRuleResult<TokenRuleResult<T>> = ({ value, length }) => ({ type, value, length })
  // return rule
  return createRule(test, createResult)
}

export function lexerRule<T extends TokenType = never>(test: Test, rules: RuleList<T>): LexerRule<T> {
  // create result function
  const tokenize: CreateRuleResult<TokenizerResult<T>> = ({ value }) => tokenizeCode(rules, value)
  // return rule
  return createRule(test, tokenize)
}

export function regexpRule<T extends TokenType>(regexp: RegExp, type: T): TokenRule<T> {
  // create test function from RegExp
  const test = regexpTest(regexp)
  // return rule
  return testRule(test, type)
}

export function stringRule<T extends TokenType>(value: string, type: T, insensitive?: boolean): TokenRule<T> {
  // create test function from string
  const test = stringTest(value, insensitive)
  // return rule
  return testRule(test, type)
}

export function oneOfStringRule<T extends TokenType>(values: string[], type: T, insensitive?: boolean) {
  // create one-of test function from string list
  const test = oneOfStringTest(values, insensitive)
  // return rule
  return testRule(test, type)
}
