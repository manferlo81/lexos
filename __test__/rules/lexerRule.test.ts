import { lexerRule, regexpRule, regexpTest } from '../../src'
import type { MultiTokenRuleResult } from '../../src/types/rule-types'

describe('lexerRule function', () => {

  test('should be a function', () => {
    const rule = lexerRule(() => null, [] as never)
    expect(typeof rule === 'function').toBe(true)
  })

  test('should return falsy if input doesn\'t match', () => {
    const expressionRule = lexerRule(regexpTest(/\{.*\}/), [
      regexpRule(/\d+/, 'Digits'),
      regexpRule(/\./, 'DecimalPoint'),
    ])
    const inputsThatDoNotMatch = [
      '147 + 2',
      '10 / 2',
      '56',
    ]
    inputsThatDoNotMatch.forEach((input) => {
      expect(expressionRule(input, 0)).toBeFalsy()
    })
  })

  test('should return multi token result once triggered', () => {
    const expressionRule = lexerRule(regexpTest(/\{.*\}/), [

    ])
    const inputsThatDoNotMatch = [
      '{45 + 2}',
    ]
    inputsThatDoNotMatch.forEach((input) => {
      expect(expressionRule(input, 0)).toEqual({
        length: 8,
        getToken: expect.any(Function) as unknown,
      })
    })
  })

  test('should return result if input matches', () => {
    const digitsType = 'Digits'
    const operatorType = 'Operator'

    const expressionRule = lexerRule(regexpTest(/\{.*\}/), [
      regexpTest(/[{}]/),
      regexpTest(/\s+/),
      regexpRule(/\d+/, digitsType),
      regexpRule(
        /[+\-*/]/,
        operatorType,
      ),
    ])

    const inputsThatMatch = [
      ['147', '+', '5'],
      ['3', '*', '12'],
      ['56', '-', '7'],
      ['89', '/', '55'],
      ['89', '+', '55', 'and more'],
    ]
    inputsThatMatch.forEach(([a, operator, b, more]) => {
      const operation = [a, operator, b].join(' ')
      const expression = `{${operation}}`
      const input = more ? [expression, more].join(' ') : expression

      const ruleResult = expressionRule(input, 0)

      expect(ruleResult).toEqual({
        length: expression.length,
        getToken: expect.any(Function) as unknown,
      })

      const { getToken } = ruleResult as MultiTokenRuleResult<never>
      expect(getToken()).toEqual({ type: digitsType, value: a, pos: 1 })
      expect(getToken()).toEqual({ type: operatorType, value: operator, pos: a.length + 2 })
      expect(getToken()).toEqual({ type: digitsType, value: b, pos: a.length + 4 })
      expect(getToken()).toBeNull()
    })
  })

  test('should return result if input matches', () => {
    const digitsType = 'Digits'
    const operatorType = 'Operator'

    const expressionRule = lexerRule(regexpTest(/\{.*\}/), [
      regexpTest(/[{}]/),
      regexpTest(/\s+/),
      regexpRule(/\d+/, digitsType),
      regexpRule(
        /[+\-*/]/,
        operatorType,
      ),
    ])

    const inputsThatMatch = [
      ['147', '+', '5'],
      ['3', '*', '12'],
      ['56', '-', '7'],
      ['89', '/', '55'],
      ['89', '+', '55', 'and more'],
    ]
    inputsThatMatch.forEach(([a, operator, b, more]) => {
      const operation = [a, operator, b].join(' ')
      const expression = `{${operation}}`
      const input = more ? [expression, more].join(' ') : expression

      const ruleResult = expressionRule(input, 0)
      expect(ruleResult).toEqual({
        length: expression.length,
        getToken: expect.any(Function) as unknown,
      })

      const { getToken } = ruleResult as MultiTokenRuleResult<never>

      expect(getToken()).toEqual({ type: digitsType, value: a, pos: 1 })
      expect(getToken()).toEqual({ type: operatorType, value: operator, pos: a.length + 2 })
      expect(getToken()).toEqual({ type: digitsType, value: b, pos: a.length + 4 })
      expect(getToken()).toBeNull()

    })
  })

})
