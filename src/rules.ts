import { createGetNextToken } from './get-next-token'
import { ruleTest, stringTest } from './tests'
import type { CodeProcessingFunction, Void } from './types/internal/helper-types'
import type { MultiTokenRule, Rule, SingleTokenRule, SingleTokenRuleResult } from './types/rule-types'
import type { AnyTest, TestResult } from './types/test-types'
import type { TokenType } from './types/token-types'
import { unifyRules } from './unify-rules'

type CreateRuleResult<R> = (result: TestResult, currentPosition: number) => R

function createRule<R>(test: AnyTest, createResult: CreateRuleResult<R>): CodeProcessingFunction<R | Void> {

  const test_ = ruleTest(test)

  // return rule
  return (input, pos) => {
    // test code at current position
    const result = test_(input, pos)

    // return no match if test didn't match
    if (!result) return

    // callback result creator function
    return createResult(result, pos)
  }
}

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

export function stringRule<T extends TokenType>(value: string | string[], type: T, insensitive?: boolean): SingleTokenRule<T> {
  return testRule(
    stringTest(value, insensitive),
    type,
  )
}

export function lexerRule<T extends TokenType = never>(test: AnyTest, rules: Rule<T> | Array<Rule<T>>): MultiTokenRule<T> {
  const unifiedRule = unifyRules(rules)
  // return rule
  return createRule(test, ({ length, value }, currentPosition) => {
    const getToken = createGetNextToken(value, unifiedRule, currentPosition, null)
    return { length, getToken }
  })
}
