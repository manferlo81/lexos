import { createOneOf, createTokenGenerator, lexerRule, regexpTest, stringRule } from '../src'
import { expectToken } from './tools/expect'

describe('createTokenGenerator internal function', () => {

  test('should create a generator', () => {
    const tokenGenerator = createTokenGenerator(
      '',
      () => null,
      0,
      null,
    )
    expect(typeof tokenGenerator === 'object').toBe(true)
    expect(typeof tokenGenerator.next === 'function').toBe(true)
  })

  test('should throw on unknown token', () => {
    const variableType = 'VAR'
    const operatorType = 'OP'
    const tokenGenerator = createTokenGenerator(
      'a + z = c',
      createOneOf([
        regexpTest(/\s+/),
        stringRule(variableType, ['a', 'b', 'c']),
        stringRule(operatorType, ['+', '=']),
      ]),
      0,
      null,
    )

    const expectedTokens = [
      expectToken(variableType, 0, 'a'),
      expectToken(operatorType, 2, '+'),
    ]

    expectedTokens.forEach((token) => {
      const { done, value } = tokenGenerator.next()
      expect(done).toBeFalsy()
      expect(value).toEqual(token)
    })
    expect(() => tokenGenerator.next()).toThrow('position 4')
  })

  test('should throw from lexer rule', () => {
    const variableType = 'VAR'
    const keywordType = 'KW'
    const curlyType = 'CURLY'
    const tokenGenerator = createTokenGenerator(
      ' evaluate { a + b - c }',
      createOneOf([
        regexpTest(/\s+/),
        stringRule(keywordType, 'evaluate'),
        lexerRule(/{.*}/, [
          regexpTest(/\s+/),
          stringRule(curlyType, ['{', '}']),
          stringRule(variableType, ['a', 'b', 'c']),
        ]),
      ]),
      0,
      null,
    )

    const expectedTokens = [
      expectToken(keywordType, 1, 'evaluate'),
      expectToken(curlyType, 10, '{'),
      expectToken(variableType, 12, 'a'),
    ]

    expectedTokens.forEach((token) => {
      const { done, value } = tokenGenerator.next()
      expect(done).toBeFalsy()
      expect(value).toEqual(token)
    })
    expect(() => tokenGenerator.next()).toThrow('position 14')
  })

  test('should not generate last token', () => {
    const nullishLastTokens = [
      null,
      undefined,
    ]
    nullishLastTokens.forEach((lastToken) => {
      const tokenGenerator = createTokenGenerator(
        '',
        () => null,
        0,
        lastToken,
      )
      expect([...tokenGenerator]).toEqual([])
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
      const tokenGenerator = createTokenGenerator(
        '',
        () => null,
        0,
        lastToken,
      )
      expect([...tokenGenerator]).toEqual([
        expectToken(lastToken, 0),
      ])
    })
  })

  test('should generate last token', () => {
    const variableType = 'VAR'
    const operatorType = 'OP'
    const tokenGenerator = createTokenGenerator(
      'a + b = c',
      createOneOf([
        regexpTest(/\s+/),
        stringRule(variableType, ['a', 'b', 'c']),
        stringRule(operatorType, ['+', '=']),
      ]),
      0,
      'LT',
    )

    expect([...tokenGenerator]).toEqual([
      expectToken(variableType, 0, 'a'),
      expectToken(operatorType, 2, '+'),
      expectToken(variableType, 4, 'b'),
      expectToken(operatorType, 6, '='),
      expectToken(variableType, 8, 'c'),
      expectToken('LT', 9),
    ])
  })

  test('should get tokens one by one', () => {
    const variableType = 'VAR'
    const operatorType = 'OP'
    const tokenGenerator = createTokenGenerator(
      'a + b = c',
      createOneOf([
        regexpTest(/\s+/),
        stringRule(variableType, ['a', 'b', 'c']),
        stringRule(operatorType, ['+', '=']),
      ]),
      0,
      'LT',
    )

    expect([...tokenGenerator]).toEqual([
      expectToken(variableType, 0, 'a'),
      expectToken(operatorType, 2, '+'),
      expectToken(variableType, 4, 'b'),
      expectToken(operatorType, 6, '='),
      expectToken(variableType, 8, 'c'),
      expectToken('LT', 9),
    ])
  })

  test('should get tokens one by one, using lexer rule', () => {
    const variableType = 'VAR'
    const operatorType = 'OP'
    const curlyType = 'CURLY'
    const keywordType = 'KW'
    const tokenGenerator = createTokenGenerator(
      ' evaluate { a + b - c }  ',
      createOneOf([
        regexpTest(/\s+/),
        stringRule(keywordType, 'evaluate'),
        lexerRule(/{.*}/, [
          regexpTest(/\s+/),
          stringRule(curlyType, ['{', '}']),
          stringRule(variableType, ['a', 'b', 'c']),
          stringRule(operatorType, ['+', '-']),
        ], 'LLT'),
      ]),
      0,
      'LT',
    )

    expect([...tokenGenerator]).toEqual([
      expectToken(keywordType, 1, 'evaluate'),
      expectToken(curlyType, 10, '{'),
      expectToken(variableType, 12, 'a'),
      expectToken(operatorType, 14, '+'),
      expectToken(variableType, 16, 'b'),
      expectToken(operatorType, 18, '-'),
      expectToken(variableType, 20, 'c'),
      expectToken(curlyType, 22, '}'),
      expectToken('LLT', 23),
      expectToken('LT', 25),
    ])
  })

  test('should get back to position after lexer rule is done', () => {
    const variableType = 'VAR'
    const operatorType = 'OP'
    const curlyType = 'CURLY'
    const keywordType = 'KW'
    const tokenGenerator = createTokenGenerator(
      ' evaluate { a + b - c } evaluate { c } keyword',
      createOneOf([
        regexpTest(/\s+/),
        stringRule(keywordType, 'evaluate'),
        stringRule(keywordType, 'keyword'),
        lexerRule(/{[^}]*}/, [
          regexpTest(/\s+/),
          stringRule(curlyType, ['{', '}']),
          stringRule(variableType, ['a', 'b', 'c']),
          stringRule(operatorType, ['+', '-']),
        ]),
      ]),
      0,
      null,
    )

    expect([...tokenGenerator]).toEqual([
      expectToken(keywordType, 1, 'evaluate'),
      expectToken(curlyType, 10, '{'),
      expectToken(variableType, 12, 'a'),
      expectToken(operatorType, 14, '+'),
      expectToken(variableType, 16, 'b'),
      expectToken(operatorType, 18, '-'),
      expectToken(variableType, 20, 'c'),
      expectToken(curlyType, 22, '}'),
      expectToken(keywordType, 24, 'evaluate'),
      expectToken(curlyType, 33, '{'),
      expectToken(variableType, 35, 'c'),
      expectToken(curlyType, 37, '}'),
      expectToken(keywordType, 39, 'keyword'),
    ])
  })

})
