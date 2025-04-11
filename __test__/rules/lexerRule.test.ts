import { lexerRule, regexpRule, regexpTest } from '../../src'
import { expectMultiTokenResult, expectToken } from '../tools/expect'

describe('lexerRule function', () => {

  test('should create rule from array of rules', () => {
    const rule = lexerRule(/[\s\S]*/, [])
    expect(typeof rule === 'function').toBe(true)
  })

  test('should create rule from single rule', () => {
    const rule = lexerRule(/[\s\S]*/, (input) => {
      return {
        length: input.length,
        token: {
          value: input,
          type: 'INPUT',
        },
      }
    })
    expect(typeof rule === 'function').toBe(true)
  })

  test('should return falsy if input doesn\'t match', () => {
    const expressionRule = lexerRule(/\{.*\}/, [
      regexpRule('Digits', /\d+/),
      regexpRule('DecimalPoint', /\./),
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
    const expressionRule = lexerRule(/\{.*\}/, [

    ])
    const inputsThatDoNotMatch = [
      '{45 + 2}',
    ]
    inputsThatDoNotMatch.forEach((input) => {
      expect(expressionRule(input, 0)).toEqual(expectMultiTokenResult(8))
    })
  })

  test('should return result if input matches', () => {
    const digitsType = 'Digits'
    const operatorType = 'Operator'

    const expressionRule = lexerRule(/\{.*\}/, [
      regexpTest(/[{}]/),
      regexpTest(/\s+/),
      regexpRule(digitsType, /\d+/),
      regexpRule(operatorType, /[+\-*/]/),
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

      expect(ruleResult).toEqual(expectMultiTokenResult(expression.length))

      const { generator } = ruleResult as Extract<typeof ruleResult, object>

      expect([...generator]).toEqual([
        expectToken(digitsType, 1, a),
        expectToken(operatorType, a.length + 2, operator),
        expectToken(digitsType, a.length + 4, b),
      ])
    })
  })

  test('should return result if input matches (with last token)', () => {
    const digitsType = 'Digits'
    const operatorType = 'Operator'

    const expressionRule = lexerRule(/\{.*\}/, [
      regexpTest(/[{}]/),
      regexpTest(/\s+/),
      regexpRule(digitsType, /\d+/),
      regexpRule(operatorType, /[+\-*/]/),
    ], 'LT')

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

      expect(ruleResult).toEqual(expectMultiTokenResult(expression.length))

      const { generator } = ruleResult as Extract<typeof ruleResult, object>

      expect([...generator]).toEqual([
        expectToken(digitsType, 1, a),
        expectToken(operatorType, a.length + 2, operator),
        expectToken(digitsType, a.length + 4, b),
        expectToken('LT', a.length + 5 + b.length),
      ])
    })
  })

})
