import { createOneOf, lexerRule, regexpTest, stringRule } from '../../src'
import { createTokenGenerator } from '../../src/generator'
import { createToken } from '../tools/create-token'

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
      createToken(variableType, 0, 'a'),
      createToken(operatorType, 2, '+'),
    ]

    expectedTokens.forEach((token) => {
      expect(tokenGenerator.next().value).toEqual(token)
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
      createToken(keywordType, 1, 'evaluate'),
      createToken(curlyType, 10, '{'),
      createToken(variableType, 12, 'a'),
    ]

    expectedTokens.forEach((token) => {
      expect(tokenGenerator.next().value).toEqual(token)
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
        createToken(lastToken, 0),
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
      createToken(variableType, 0, 'a'),
      createToken(operatorType, 2, '+'),
      createToken(variableType, 4, 'b'),
      createToken(operatorType, 6, '='),
      createToken(variableType, 8, 'c'),
      createToken('LT', 9),
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
      createToken(variableType, 0, 'a'),
      createToken(operatorType, 2, '+'),
      createToken(variableType, 4, 'b'),
      createToken(operatorType, 6, '='),
      createToken(variableType, 8, 'c'),
      createToken('LT', 9),
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
    ])
  })

  test('should get back to position after lexer rule is done', () => {
    const variableType = 'VAR'
    const operatorType = 'OP'
    const curlyType = 'CURLY'
    const keywordType = 'KW'
    const tokenGenerator = createTokenGenerator(
      ' evaluate { a + b - c } evaluate { c }',
      createOneOf([
        regexpTest(/\s+/),
        stringRule(keywordType, 'evaluate'),
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

    expect([...tokenGenerator]).toEqual(expectedTokens)
  })

})
