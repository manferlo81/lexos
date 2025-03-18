import { lexerRule, regexpRule, regexpTest } from '../../src'
import type { FalsyReturn } from '../../src/types/helper-types'
import { createToken } from '../tools/create-token'

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
      expect(expressionRule(input, 0)).toEqual({
        length: 8,
        generator: expect.any(Object) as unknown,
      })
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

      expect(ruleResult).toEqual({
        length: expression.length,
        generator: expect.any(Object) as unknown,
      })

      const { generator } = ruleResult as Exclude<typeof ruleResult, FalsyReturn>

      const expectedTokens = [
        createToken(digitsType, 1, a),
        createToken(operatorType, a.length + 2, operator),
        createToken(digitsType, a.length + 4, b),
      ]

      expectedTokens.forEach((token) => {
        expect(generator.next().value).toEqual(token)
      })
      expect(generator.next().done).toBeTruthy()
      expect(generator.next().done).toBeTruthy()
      expect(generator.next().done).toBeTruthy()
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

      expect(ruleResult).toEqual({
        length: expression.length,
        generator: expect.any(Object) as unknown,
      })

      const { generator } = ruleResult as Exclude<typeof ruleResult, FalsyReturn>

      const expectedTokens = [
        createToken(digitsType, 1, a),
        createToken(operatorType, a.length + 2, operator),
        createToken(digitsType, a.length + 4, b),
        createToken('LT', a.length + 5 + b.length),
      ]

      expectedTokens.forEach((token) => {
        expect(generator.next().value).toEqual(token)
      })
      expect(generator.next().done).toBeTruthy()
      expect(generator.next().done).toBeTruthy()
      expect(generator.next().done).toBeTruthy()
    })
  })

})
