import type { LengthTest, MultiTokenRule, SingleTokenRule, ValueTest } from '../../src'
import { createOneOf, initTokenGenerator, lexerRule, regexpRule, regexpTest, stringRule, stringTest } from '../../src'
import { expectToken } from '../tools/expect'

describe('initTokenGenerator function', () => {

  test('should create a generator', () => {
    const createTokenGenerator = initTokenGenerator(() => null)
    const tokenGenerator = createTokenGenerator('')
    expect(typeof tokenGenerator === 'object').toBe(true)
    expect(typeof tokenGenerator.next === 'function').toBe(true)
  })

  test('should throw on unknown token', () => {
    const variableType = 'VAR'
    const operatorType = 'OP'
    const createTokenGenerator = initTokenGenerator([
      regexpTest(/\s+/),
      stringRule(variableType, ['a', 'b', 'c']),
      stringRule(operatorType, ['+', '=']),
    ])
    const tokenGenerator = createTokenGenerator('a + z = c')

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

  test('should throw on invalid length', () => {
    const invalidLengthLengthTest: LengthTest = () => 4
    const invalidLengthValueTest: ValueTest = () => ({ length: 4, value: 'abc' })
    const invalidLengthSingleTokenRule: SingleTokenRule<'TYPE'> = () => ({ length: 4, token: { type: 'TYPE', value: 'abc' } })
    const invalidLengthMultiTokenRule: MultiTokenRule<never, never> = () => {
      const createGenerator = initTokenGenerator(() => 1)
      return { length: 4, generator: createGenerator('abc') }
    }
    const invalidLengthRules = [
      invalidLengthLengthTest,
      invalidLengthValueTest,
      invalidLengthSingleTokenRule,
      invalidLengthMultiTokenRule,
    ]
    invalidLengthRules.forEach((rule) => {
      const createTokenGenerator = initTokenGenerator(rule)
      const tokenGenerator = createTokenGenerator('abc')
      expect(() => [...tokenGenerator]).toThrow('Invalid length')
    })
  })

  test('should throw from lexer rule', () => {
    const variableType = 'VAR'
    const keywordType = 'KW'
    const curlyType = 'CURLY'
    const createTokenGenerator = initTokenGenerator(createOneOf([
      regexpTest(/\s+/),
      stringRule(keywordType, 'evaluate'),
      lexerRule(/{.*}/, [
        regexpTest(/\s+/),
        stringRule(curlyType, ['{', '}']),
        stringRule(variableType, ['a', 'b', 'c']),
      ]),
    ]))
    const tokenGenerator = createTokenGenerator(' evaluate { a + b - c }')

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

  test('should use offset for errors', () => {
    const createTokenGenerator = initTokenGenerator(regexpTest(/\s+/))

    const offsets = [0, 5]

    offsets.forEach((offset) => {
      const tokenGenerator = createTokenGenerator('  a + z = c', offset)
      expect(() => [...tokenGenerator]).toThrow(`position ${2 + offset}`)
    })
  })

  test('should not generate last token', () => {
    const nullishLastTokens = [
      null,
      undefined,
    ]
    nullishLastTokens.forEach((lastToken) => {
      const createTokenGenerator = initTokenGenerator(() => null, lastToken)
      const tokenGenerator = createTokenGenerator('')
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
      const createTokenGenerator = initTokenGenerator(() => null, lastToken)
      const tokenGenerator = createTokenGenerator('')
      expect([...tokenGenerator]).toEqual([
        expectToken(lastToken, 0),
      ])
    })
  })

  test('should generate last token', () => {
    const variableType = 'VAR'
    const operatorType = 'OP'
    const createTokenGenerator = initTokenGenerator(createOneOf([
      regexpTest(/\s+/),
      stringRule(variableType, ['a', 'b', 'c']),
      stringRule(operatorType, ['+', '=']),
    ]), 'LT')
    const tokenGenerator = createTokenGenerator('a + b = c')

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
    const createTokenGenerator = initTokenGenerator(createOneOf([
      regexpTest(/\s+/),
      stringRule(variableType, ['a', 'b', 'c']),
      stringRule(operatorType, ['+', '=']),
    ]), 'LT')
    const tokenGenerator = createTokenGenerator('a + b = c')

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
    const createTokenGenerator = initTokenGenerator(
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
      'LT',
    )
    const tokenGenerator = createTokenGenerator(' evaluate { a + b - c }  ')

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
    const createTokenGenerator = initTokenGenerator(
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
    )
    const tokenGenerator = createTokenGenerator(' evaluate { a + b - c } evaluate { c } keyword')

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

  test('should use offset for token position', () => {
    const variableType = 'VAR'
    const operatorType = 'OP'
    const createTokenGenerator = initTokenGenerator(createOneOf([
      regexpTest(/\s+/),
      stringRule(variableType, ['a', 'b', 'c']),
      stringRule(operatorType, ['+', '=']),
    ]), 'LT')

    const offset = [0, 5]

    offset.forEach((offset) => {
      const tokenGenerator = createTokenGenerator('a + b = c', offset)
      expect([...tokenGenerator]).toEqual([
        expectToken(variableType, 0 + offset, 'a'),
        expectToken(operatorType, 2 + offset, '+'),
        expectToken(variableType, 4 + offset, 'b'),
        expectToken(operatorType, 6 + offset, '='),
        expectToken(variableType, 8 + offset, 'c'),
        expectToken('LT', 9 + offset),
      ])
    })
  })

  test('should use different kind or rules', () => {
    const spaceTest: LengthTest = (input, pos) => {
      let currentPos = pos
      while (input[currentPos] === ' ') currentPos++
      return currentPos - pos
    }
    const createTokenGenerator = initTokenGenerator([
      spaceTest,
      stringTest(['+', '-']),
      stringTest('='),
      regexpRule('A', /a/i),
      stringRule('B', 'b'),
      stringRule(() => 'C', 'c'),
    ])
    const tokenGenerator = createTokenGenerator('a + A - b = c')
    expect([...tokenGenerator]).toEqual([
      expectToken('A', 0, 'a'),
      expectToken('A', 4, 'A'),
      expectToken('B', 8, 'b'),
      expectToken('C', 12, 'c'),
    ])
  })

  test('should use single rule with different results', () => {
    const createTokenGenerator = initTokenGenerator((input, pos) => {
      if (input[pos] === ' ') {
        let currentPos = pos + 1
        while (input[currentPos] === ' ') currentPos++
        return currentPos - pos
      }
      if (['+', '-', '='].includes(input[pos])) {
        return { length: 1, value: input[pos] }
      }
      if (['a', 'A'].includes(input[pos])) {
        return { length: 1, token: { type: 'A', value: input[pos] } }
      }
      if (input[pos] === 'b') {
        return { length: 1, token: { type: 'B', value: input[pos] } }
      }
      if (input[pos] === 'c') {
        return { length: 1, token: { type: 'C', value: input[pos] } }
      }
    })
    const tokenGenerator = createTokenGenerator('a + A - b = c')
    expect([...tokenGenerator]).toEqual([
      expectToken('A', 0, 'a'),
      expectToken('A', 4, 'A'),
      expectToken('B', 8, 'b'),
      expectToken('C', 12, 'c'),
    ])
  })

})
