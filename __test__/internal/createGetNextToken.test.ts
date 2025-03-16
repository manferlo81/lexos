import { createOneOf, lexerRule, regexpTest, stringRule } from '../../src'
import { createGetNextToken } from '../../src/tools/get-next-token'
import { createToken } from '../tools/create-token'

describe('createGetNextToken internal function', () => {

  test('should create a function', () => {
    const getNextToken = createGetNextToken(
      '',
      () => null,
      0,
      null,
    )
    expect(typeof getNextToken === 'function').toBe(true)
  })

  test('should throw on unknown token', () => {
    const variableType = 'VAR'
    const operatorType = 'OP'
    const getNextToken = createGetNextToken(
      'a + z = c',
      createOneOf([
        regexpTest(/\s+/),
        stringRule(['a', 'b', 'c'], variableType),
        stringRule(['+', '='], operatorType),
      ]),
      0,
      null,
    )

    const expectedTokens = [
      createToken(variableType, 0, 'a'),
      createToken(operatorType, 2, '+'),
    ]

    expectedTokens.forEach((token) => {
      expect(getNextToken()).toEqual(token)
    })
    expect(getNextToken).toThrow('position 4')
  })

  test('should throw from lexer rule', () => {
    const variableType = 'VAR'
    const keywordType = 'KW'
    const curlyType = 'CURLY'
    const getNextToken = createGetNextToken(
      ' evaluate { a + b - c }',
      createOneOf([
        regexpTest(/\s+/),
        stringRule('evaluate', keywordType),
        lexerRule(/{.*}/, [
          regexpTest(/\s+/),
          stringRule(['{', '}'], curlyType),
          stringRule(['a', 'b', 'c'], variableType),
        ]),
      ]),
      0,
      null,
    )

    const expectedTokens = [
      createToken(keywordType, 1, 'evaluate'),
      createToken(curlyType, 10, '{'),
      createToken(variableType, 12, 'a'),
    ]

    expectedTokens.forEach((token) => {
      expect(getNextToken()).toEqual(token)
    })
    expect(getNextToken).toThrow('position 14')
  })

  test('should return null as last token', () => {
    const nullishLastTokens = [
      null,
      undefined,
    ]
    nullishLastTokens.forEach((lastToken) => {
      const getNextToken = createGetNextToken(
        '',
        () => null,
        0,
        lastToken,
      )
      expect(getNextToken()).toBeNull()
      expect(getNextToken()).toBeNull()
    })
  })

  test('should return last token once', () => {
    const falsyLastTokens = [
      '' as const,
      0 as const,
    ]
    const lastTokens = [
      'T' as const,
      'LT' as const,
      1 as const,
      -2 as const,
      ...falsyLastTokens,
    ]
    lastTokens.forEach((lastToken) => {
      const getNextToken = createGetNextToken(
        '',
        () => null,
        0,
        lastToken,
      )
      expect(getNextToken()).toEqual(createToken(lastToken, 0))
      expect(getNextToken()).toBeNull()
    })
  })

  test('should return null after last token', () => {
    const variableType = 'VAR'
    const operatorType = 'OP'
    const getNextToken = createGetNextToken(
      'a + b = c',
      createOneOf([
        regexpTest(/\s+/),
        stringRule(['a', 'b', 'c'], variableType),
        stringRule(['+', '='], operatorType),
      ]),
      0,
      'LT',
    )

    const expectedTokens = [
      createToken(variableType, 0, 'a'),
      createToken(operatorType, 2, '+'),
      createToken(variableType, 4, 'b'),
      createToken(operatorType, 6, '='),
      createToken(variableType, 8, 'c'),
      createToken('LT', 9),
    ]

    expectedTokens.forEach((token) => {
      expect(getNextToken()).toEqual(token)
    })
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
  })

  test('should get tokens one by one', () => {
    const variableType = 'VAR'
    const operatorType = 'OP'
    const getNextToken = createGetNextToken(
      'a + b = c',
      createOneOf([
        regexpTest(/\s+/),
        stringRule(['a', 'b', 'c'], variableType),
        stringRule(['+', '='], operatorType),
      ]),
      0,
      'LT',
    )

    const expectedTokens = [
      createToken(variableType, 0, 'a'),
      createToken(operatorType, 2, '+'),
      createToken(variableType, 4, 'b'),
      createToken(operatorType, 6, '='),
      createToken(variableType, 8, 'c'),
      createToken('LT', 9),
    ]

    expectedTokens.forEach((token) => {
      expect(getNextToken()).toEqual(token)
    })
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
  })

  test('should get tokens one by one, using lexer rule', () => {
    const variableType = 'VAR'
    const operatorType = 'OP'
    const curlyType = 'CURLY'
    const keywordType = 'KW'
    const getNextToken = createGetNextToken(
      ' evaluate { a + b - c }  ',
      createOneOf([
        regexpTest(/\s+/),
        stringRule('evaluate', keywordType),
        lexerRule(/{.*}/, [
          regexpTest(/\s+/),
          stringRule(['{', '}'], curlyType),
          stringRule(['a', 'b', 'c'], variableType),
          stringRule(['+', '-'], operatorType),
        ], 'LLT'),
      ]),
      0,
      'LT',
    )

    const expectedTokens = [
      createToken(keywordType, 1, 'evaluate'),
      createToken(curlyType, 10, '{'),
      createToken(variableType, 12, 'a'),
      createToken(operatorType, 14, '+'),
      createToken(variableType, 16, 'b'),
      createToken(operatorType, 18, '-'),
      createToken(variableType, 20, 'c'),
      createToken(curlyType, 22, '}'),
      createToken('LLT', 23),
      createToken('LT', 25),
    ]

    expectedTokens.forEach((token) => {
      expect(getNextToken()).toEqual(token)
    })
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
  })

  test('should get back to position after lexer rule is done', () => {
    const variableType = 'VAR'
    const operatorType = 'OP'
    const curlyType = 'CURLY'
    const keywordType = 'KW'
    const getNextToken = createGetNextToken(
      ' evaluate { a + b - c } evaluate { c }',
      createOneOf([
        regexpTest(/\s+/),
        stringRule('evaluate', keywordType),
        lexerRule(/{[^}]*}/, [
          regexpTest(/\s+/),
          stringRule(['{', '}'], curlyType),
          stringRule(['a', 'b', 'c'], variableType),
          stringRule(['+', '-'], operatorType),
        ]),
      ]),
      0,
      null,
    )

    const expectedTokens = [
      createToken(keywordType, 1, 'evaluate'),
      createToken(curlyType, 10, '{'),
      createToken(variableType, 12, 'a'),
      createToken(operatorType, 14, '+'),
      createToken(variableType, 16, 'b'),
      createToken(operatorType, 18, '-'),
      createToken(variableType, 20, 'c'),
      createToken(curlyType, 22, '}'),
      createToken(keywordType, 24, 'evaluate'),
      createToken(curlyType, 33, '{'),
      createToken(variableType, 35, 'c'),
      createToken(curlyType, 37, '}'),
    ]

    expectedTokens.forEach((token) => {
      expect(getNextToken()).toEqual(token)
    })
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
  })

})
