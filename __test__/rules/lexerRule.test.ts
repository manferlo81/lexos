import { lexerRule, regexpRule, regexpTest } from '../../src'

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

  test('should return result once the test is triggered', () => {
    const expressionRule = lexerRule(regexpTest(/\{.*\}/), [

    ] as never)
    const inputsThatDoNotMatch = [
      '{45 + 2}',
    ]
    inputsThatDoNotMatch.forEach((input) => {
      expect(expressionRule(input, 0)).toEqual({
        done: false,
        length: 0,
        tokens: [],
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

      expect(expressionRule(input, 0)).toEqual({
        length: expression.length,
        done: true,
        tokens: [
          { type: digitsType, value: a, pos: 1 },
          { type: operatorType, value: operator, pos: a.length + 2 },
          { type: digitsType, value: b, pos: a.length + 4 },
        ],
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

      expect(expressionRule(input, 0)).toEqual({
        length: expression.length,
        done: true,
        tokens: [
          { type: digitsType, value: a, pos: 1 },
          { type: operatorType, value: operator, pos: a.length + 2 },
          { type: digitsType, value: b, pos: a.length + 4 },
        ],
      })

    })
  })

})
