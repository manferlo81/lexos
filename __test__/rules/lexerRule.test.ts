import { lexerRule, regexpRule, regexpTest } from '../../src'
import type { FalsyReturn } from '../../src/types/internal/helper-types'
import type { MultiTokenRuleResult } from '../../src/types/rule-types'
import { createToken } from '../tools/create-token'

describe('lexerRule function', () => {

  test('should be a function', () => {
    const rule = lexerRule(() => null, [] as never)
    expect(typeof rule === 'function').toBe(true)
  })

  test('should return falsy if input doesn\'t match', () => {
    const expressionRule = lexerRule(/\{.*\}/, [
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
    const expressionRule = lexerRule(/\{.*\}/, [

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

    const expressionRule = lexerRule(/\{.*\}/, [
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

      const { getToken } = ruleResult as MultiTokenRuleResult<never, never>

      const expectedTokens = [
        createToken(digitsType, 1, a),
        createToken(operatorType, a.length + 2, operator),
        createToken(digitsType, a.length + 4, b),
      ]

      expectedTokens.forEach((token) => {
        expect(getToken()).toEqual(token)
      })
      expect(getToken()).toBeNull()
      expect(getToken()).toBeNull()
      expect(getToken()).toBeNull()
    })
  })

  test('should return result if input matches (with last token)', () => {
    const digitsType = 'Digits'
    const operatorType = 'Operator'

    const expressionRule = lexerRule(/\{.*\}/, [
      regexpTest(/[{}]/),
      regexpTest(/\s+/),
      regexpRule(/\d+/, digitsType),
      regexpRule(
        /[+\-*/]/,
        operatorType,
      ),
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
        getToken: expect.any(Function) as unknown,
      })

      const { getToken } = ruleResult as Exclude<typeof ruleResult, FalsyReturn>

      const expectedTokens = [
        createToken(digitsType, 1, a),
        createToken(operatorType, a.length + 2, operator),
        createToken(digitsType, a.length + 4, b),
        createToken('LT', a.length + 5 + b.length),
      ]

      expectedTokens.forEach((token) => {
        expect(getToken()).toEqual(token)
      })
      expect(getToken()).toBeNull()
      expect(getToken()).toBeNull()
      expect(getToken()).toBeNull()
    })
  })

})
