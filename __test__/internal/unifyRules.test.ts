import { regexpTest, stringRule } from '../../src'
import type { Rule } from '../../src'
import { unifyRules } from '../../src/tools/unify-rules'

describe('unifyRules internal function', () => {

  test('should return input if it\'s a function', () => {
    const inputRule: Rule<never, never> = () => null
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
    expect(rule('   one', 0)).toEqual({ value: '   ', length: 3 })
    expect(rule('   one', 2)).toEqual({ value: ' ', length: 1 })
    expect(rule('   one', 3)).toEqual({ length: 3, token: { value: 'one', type: 'Num' } })
    expect(rule('   one two', 3)).toEqual({ length: 3, token: { value: 'one', type: 'Num' } })
    expect(rule('   two', 3)).toEqual({ length: 3, token: { value: 'two', type: 'Num' } })
    expect(rule('   one two', 7)).toEqual({ length: 3, token: { value: 'two', type: 'Num' } })
  })

})
