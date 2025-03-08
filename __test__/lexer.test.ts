import { createLexer, oneOfTest, regexpRule, regexpTest, stringTest, testRule } from '../src'

describe('createLexer function', () => {

  test('should tokenize input code', () => {
    const integerType = 'Int'
    const variableType = 'Var'
    const operatorType = 'Op'
    const groupType = 'Gr'

    const tokenize = createLexer([
      regexpTest(/[^\S]+/),
      regexpRule(/[0-9]+/, integerType),
      regexpRule(/[a-z]+/i, variableType),
      testRule(
        oneOfTest([
          stringTest('+'),
          stringTest('-'),
          stringTest('*'),
          stringTest('/'),
          stringTest('='),
        ]),
        operatorType,
      ),
      testRule(
        oneOfTest([
          stringTest('('),
          stringTest(')'),
        ]),
        groupType,
      ),
    ])

    const input = '  y = 2 + 3 * (x + 1)'
    const result = tokenize(input)

    expect(result).toEqual({
      done: true,
      length: input.length,
      tokens: expect.any(Array) as never,
    })

    const { tokens } = result

    expect(tokens).toEqual([
      { type: variableType, value: 'y', pos: 2 },
      { type: operatorType, value: '=', pos: 4 },
      { type: integerType, value: '2', pos: 6 },
      { type: operatorType, value: '+', pos: 8 },
      { type: integerType, value: '3', pos: 10 },
      { type: operatorType, value: '*', pos: 12 },
      { type: groupType, value: '(', pos: 14 },
      { type: variableType, value: 'x', pos: 15 },
      { type: operatorType, value: '+', pos: 17 },
      { type: integerType, value: '1', pos: 19 },
      { type: groupType, value: ')', pos: 20 },
    ])
  })

})
