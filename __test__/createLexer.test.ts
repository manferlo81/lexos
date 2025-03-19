import { createLexer, regexpRule, regexpTest, stringRule } from '../src'
import { expectToken } from './tools/expect'

describe('createLexer function', () => {

  test('should create lexer from array of rules', () => {
    const lexer = createLexer([
      () => null,
    ])
    expect(typeof lexer === 'function').toBe(true)
  })

  test('should create lexer from single rule', () => {
    const lexer = createLexer((input) => {
      return {
        length: input.length,
        token: { value: input, type: 'INPUT' },
      }
    })
    expect(typeof lexer === 'function').toBe(true)
  })

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
    const keywordType = 'KW'
    const lexer = createLexer([
      regexpTest(/\s+/),
      stringRule(keywordType, 'print'),
      neverMatch,
    ])
    const getNextToken = lexer('  print   a + b = c')
    expect(getNextToken()).toEqual(expectToken(keywordType, 2, 'print'))
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
      regexpRule('VARIABLE', /[a-z]+/i),
      regexpRule('OPERATOR', /[+=]/i),
    ])
    const getNextToken = lexer('a + b = c')
    const expectedTokens = [
      expectToken('VARIABLE', 0, 'a'),
      expectToken('OPERATOR', 2, '+'),
      expectToken('VARIABLE', 4, 'b'),
      expectToken('OPERATOR', 6, '='),
      expectToken('VARIABLE', 8, 'c'),
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
      regexpRule('VARIABLE', /[a-z]+/i),
      regexpRule('OPERATOR', /[+=]/i),
    ], 'LT')
    const getNextToken = lexer('a + b = c')
    const expectedToken = [
      expectToken('VARIABLE', 0, 'a'),
      expectToken('OPERATOR', 2, '+'),
      expectToken('VARIABLE', 4, 'b'),
      expectToken('OPERATOR', 6, '='),
      expectToken('VARIABLE', 8, 'c'),
      expectToken('LT', 9),
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
    expect(getNextToken()).toEqual(expectToken('LT', 0))
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
  })

})
