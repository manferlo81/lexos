import { createLexer, regexpRule, regexpTest, stringRule } from '../src'
import { createToken } from './tools/create-token'

describe('createLexer function', () => {

  test('should throw if no rule matched', () => {
    const neverMatch = () => null
    const lexer = createLexer([
      neverMatch,
    ])
    const getNextToken = lexer('a + b = c')
    expect(getNextToken).toThrow('position 0')
  })

  test('should throw if no rule matched, after started', () => {
    const neverMatch = () => null
    const lexer = createLexer([
      regexpTest(/\s+/),
      stringRule('print', 'KW'),
      neverMatch,
    ])
    const getNextToken = lexer('  print   a + b = c')
    expect(getNextToken()).toEqual({ type: 'KW', value: 'print', pos: 2 })
    expect(getNextToken).toThrow('position 10')
  })

  test('should throw if no rules to match', () => {
    const lexer = createLexer([])
    const getNextToken = lexer('a + b = c')
    expect(getNextToken).toThrow('position 0')
  })

  test('should tokenize input', () => {
    const lexer = createLexer([
      regexpTest(/[^\S]+/),
      regexpRule(/[a-z]+/i, 'VARIABLE'),
      regexpRule(/[+=]/i, 'OPERATOR'),
    ])
    const getNextToken = lexer('a + b = c')
    const expectedTokens = [
      createToken('VARIABLE', 0, 'a'),
      createToken('OPERATOR', 2, '+'),
      createToken('VARIABLE', 4, 'b'),
      createToken('OPERATOR', 6, '='),
      createToken('VARIABLE', 8, 'c'),
    ]
    expectedTokens.forEach((token) => {
      expect(getNextToken()).toEqual(token)
    })
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
  })

  test('should tokenize input (with last token)', () => {
    const lexer = createLexer([
      regexpTest(/[^\S]+/),
      regexpRule(/[a-z]+/i, 'VARIABLE'),
      regexpRule(/[+=]/i, 'OPERATOR'),
    ], 'LT')
    const getNextToken = lexer('a + b = c')
    const expectedToken = [
      createToken('VARIABLE', 0, 'a'),
      createToken('OPERATOR', 2, '+'),
      createToken('VARIABLE', 4, 'b'),
      createToken('OPERATOR', 6, '='),
      createToken('VARIABLE', 8, 'c'),
      createToken('LT', 9),
    ]
    expectedToken.forEach((token) => {
      expect(getNextToken()).toEqual(token)
    })
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
  })

  test('should tokenize empty input', () => {
    const lexer = createLexer([])
    const getNextToken = lexer('')
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
  })

  test('should tokenize empty input (with last token)', () => {
    const lexer = createLexer([], 'LT')
    const getNextToken = lexer('')
    expect(getNextToken()).toEqual(createToken('LT', 0))
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
  })

})
