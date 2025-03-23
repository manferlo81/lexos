import { createLexer, regexpRule, regexpTest, stringRule } from '../../src'
import { expectToken } from '../tools/expect'
import { neverMatchTest, wholeInputRule } from '../tools/rules'

describe('createLexer function', () => {

  test('should create lexer from single rule', () => {
    const rule = wholeInputRule()
    const lexer = createLexer(rule)
    expect(typeof lexer === 'function').toBe(true)
  })

  test('should create lexer from array of rules', () => {
    const rule = wholeInputRule()
    const lexer = createLexer([
      rule,
    ])
    expect(typeof lexer === 'function').toBe(true)
  })

  test('should throw if no rule matched, using offset', () => {
    const neverMatch = neverMatchTest()
    const lexer = createLexer(neverMatch)
    const offsets = [0, 2, 5]
    offsets.forEach((offset) => {
      const getNextToken = lexer('a + b = c', offset)
      expect(getNextToken).toThrow(`position ${offset}`)
    })
  })

  test('should throw on unknown token using offset (after started)', () => {
    const neverMatch = neverMatchTest()
    const keywordType = 'KW'
    const lexer = createLexer([
      regexpTest(/\s+/),
      stringRule(keywordType, 'print'),
      neverMatch,
    ])
    const offsets = [0, 2, 5]
    offsets.forEach((offset) => {
      const getNextToken = lexer('  print   a + b = c', offset)
      expect(getNextToken()).toEqual(expectToken(keywordType, 2 + offset, 'print'))
      expect(getNextToken).toThrow(`position ${10 + offset}`)
    })
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
    const expectedTokens = [
      expectToken('VARIABLE', 0, 'a'),
      expectToken('OPERATOR', 2, '+'),
      expectToken('VARIABLE', 4, 'b'),
      expectToken('OPERATOR', 6, '='),
      expectToken('VARIABLE', 8, 'c'),
      expectToken('LT', 9),
    ]
    expectedTokens.forEach((token) => {
      expect(getNextToken()).toEqual(token)
    })
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
  })

  test('should tokenize input, using offset', () => {
    const lexer = createLexer([
      regexpTest(/[^\S]+/),
      regexpRule('VARIABLE', /[a-z]+/i),
      regexpRule('OPERATOR', /[+=]/i),
    ], 'LT')
    const offsets = [0, 2, 5]
    offsets.forEach((offset) => {
      const getNextToken = lexer('a + b = c', offset)
      const expectedTokens = [
        expectToken('VARIABLE', 0 + offset, 'a'),
        expectToken('OPERATOR', 2 + offset, '+'),
        expectToken('VARIABLE', 4 + offset, 'b'),
        expectToken('OPERATOR', 6 + offset, '='),
        expectToken('VARIABLE', 8 + offset, 'c'),
        expectToken('LT', 9 + offset),
      ]
      expectedTokens.forEach((token) => {
        expect(getNextToken()).toEqual(token)
      })
      expect(getNextToken()).toBeNull()
      expect(getNextToken()).toBeNull()
      expect(getNextToken()).toBeNull()
    })
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
