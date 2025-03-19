import type { Test } from '../../src'
import { regexpTest, stringRule } from '../../src'
import { unifyRules } from '../../src/tools/unify-rules'
import { expectSingleTokenResult, expectTestResult } from '../tools/expect'

describe('unifyRules internal function', () => {

  test('should return input if it\'s a function', () => {
    const inputRule: Test = () => null
    const outputRule = unifyRules(inputRule)
    expect(outputRule).toBe(inputRule)
  })

  test('should create a new rule if input is an array', () => {
    const rule = unifyRules([])
    expect(typeof rule === 'function').toBe(true)
  })

  test('should create a one-of rule from array', () => {
    const rule = unifyRules([
      regexpTest(/\s+/),
      stringRule('Num', ['one', 'two']),
    ])
    expect(rule('   one', 0)).toEqual(expectTestResult('   '))
    expect(rule('   one', 2)).toEqual(expectTestResult(' '))
    expect(rule('   one', 3)).toEqual(expectSingleTokenResult('one', 'Num'))
    expect(rule('   one two', 3)).toEqual(expectSingleTokenResult('one', 'Num'))
    expect(rule('   two', 3)).toEqual(expectSingleTokenResult('two', 'Num'))
    expect(rule('   one two', 7)).toEqual(expectSingleTokenResult('two', 'Num'))
  })

})
