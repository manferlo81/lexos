import { createLexer, lexerRule, oneOfTest, regexpRule, regexpTest, stringTest, testRule } from '../src'
import { oneOfStringRule } from '../src/rules'

describe('createLexer function', () => {

  test('should tokenize even if it can\'t finish', () => {

    const variableType = 'Var'
    const integerType = 'Int'
    const operatorType = 'Op'

    const tokenize = createLexer([
      regexpTest(/\s+/),
      regexpRule(/[xy]/, variableType),
      regexpRule(/\d+/, integerType),
      oneOfStringRule(['+', '-', '*', '/', '='], operatorType),
    ])

    const tokenizableInput = '  y = x + 2 / '
    const input = `${tokenizableInput}PI`
    const result = tokenize(input)

    expect(result).toEqual({
      length: tokenizableInput.length,
      done: false,
      tokens: expect.any(Array) as never,
    })

    const { tokens } = result

    expect(tokens).toHaveLength(6)
    expect(tokens).toEqual([
      { type: variableType, value: 'y', pos: 2 },
      { type: operatorType, value: '=', pos: 4 },
      { type: variableType, value: 'x', pos: 6 },
      { type: operatorType, value: '+', pos: 8 },
      { type: integerType, value: '2', pos: 10 },
      { type: operatorType, value: '/', pos: 12 },
    ])

  })

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

    expect(tokens).toHaveLength(11)
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

  test('should tokenize input code (with lexer rule)', () => {
    const integerType = 'Int'
    const variableType = 'Var'
    const operatorType = 'Op'
    const groupType = 'Gr'

    const ignoreWhitespaces = regexpTest(/\s+/)

    const operatorRule = testRule(
      oneOfTest([
        stringTest('+'),
        stringTest('-'),
        stringTest('*'),
        stringTest('/'),
        stringTest('='),
      ]),
      operatorType,
    )

    const integerRule = regexpRule(/[0-9]+/, integerType)
    const variableRule = regexpRule(/[a-z]+/i, variableType)

    const tokenize = createLexer([
      ignoreWhitespaces,
      integerRule,
      variableRule,
      operatorRule,
      lexerRule(
        regexpTest(/\([^)]*\)/),
        [
          ignoreWhitespaces,
          regexpRule(/[()]/, groupType),
          integerRule,
          variableRule,
          operatorRule,
        ],
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
