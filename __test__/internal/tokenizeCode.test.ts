import { lexerRule, regexpRule, regexpTest } from '../../src'
import { tokenizeCode } from '../../src/tokenize'

describe('tokenizeCode internal function', () => {

  test('should set done if done', () => {
    const code = 'a + b = c'

    const variableType = 'Var'
    const operatorType = 'Op'

    const result = tokenizeCode([
      regexpTest(/\s+/),
      regexpRule(/[a-z]+/i, variableType),
      regexpRule(/[+=]/, operatorType),
    ], code)

    expect(result).toEqual({
      done: true,
      length: code.length,
      tokens: [
        { type: variableType, value: 'a', pos: 0 },
        { type: operatorType, value: '+', pos: 2 },
        { type: variableType, value: 'b', pos: 4 },
        { type: operatorType, value: '=', pos: 6 },
        { type: variableType, value: 'c', pos: 8 },
      ],
    })

  })

  test('should return even if it didn\'t finish', () => {
    const tokenizableCode = 'a + b = c '
    const code = `${tokenizableCode}/ 2`

    const variableType = 'Var'
    const operatorType = 'Op'

    const result = tokenizeCode([
      regexpTest(/\s+/),
      regexpRule(/[a-z]+/i, variableType),
      regexpRule(/[+=]/, operatorType),
    ], code)

    expect(result).toEqual({
      done: false,
      length: tokenizableCode.length,
      tokens: [
        { type: variableType, value: 'a', pos: 0 },
        { type: operatorType, value: '+', pos: 2 },
        { type: variableType, value: 'b', pos: 4 },
        { type: operatorType, value: '=', pos: 6 },
        { type: variableType, value: 'c', pos: 8 },
      ],
    })

  })

  test('should return if matching rule didn\'t processed any code', () => {
    const code = 'a + b = c'

    const result = tokenizeCode([
      () => ({ length: 0, value: '' }),
    ], code)

    expect(result).toEqual({
      done: false,
      length: 0,
      tokens: [],
    })

  })

  test('should return if lexer rule was not done', () => {
    const code = 'a + b = c'

    const result = tokenizeCode([
      lexerRule(regexpTest(/[a-z\s+=]/i), [
        regexpRule(/[a-z]/i, 'Var'),
      ]),
    ], code)

    expect(result).toEqual({
      done: false,
      length: 1,
      tokens: [
        { type: 'Var', value: 'a', pos: 0 },
      ],
    })

  })

})
