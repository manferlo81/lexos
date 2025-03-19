import { createTokenizer, regexpRule, regexpTest, stringRule } from '../../src'
import { expectToken } from '../tools/expect'

describe('createTokenizer function', () => {

  test('should create tokenizer from array of rules', () => {
    const tokenize = createTokenizer([
      () => null,
    ])
    expect(typeof tokenize === 'function').toBe(true)
  })

  test('should create tokenizer from single rule', () => {
    const tokenize = createTokenizer((input) => {
      return {
        length: input.length,
        token: { value: input, type: 'INPUT' },
      }
    })
    expect(typeof tokenize === 'function').toBe(true)
  })

  test('should throw if no rule matched', () => {
    const neverMatch = () => null
    const tokenize = createTokenizer([
      neverMatch,
    ])
    const exec = () => tokenize('a + b = c')
    expect(exec).toThrow('position 0')
  })

  test('should throw if no rule matched, after started', () => {
    const neverMatch = () => null
    const tokenize = createTokenizer([
      regexpTest(/\s+/),
      stringRule('KW', 'print'),
      neverMatch,
    ])
    const exec = () => tokenize('  print   a + b = c')
    expect(exec).toThrow('position 10')
  })

  test('should throw if no rules to match', () => {
    const tokenize = createTokenizer([])
    const exec = () => tokenize('a + b = c')
    expect(exec).toThrow('position 0')
  })

  test('should tokenize input', () => {
    const tokenize = createTokenizer([
      regexpTest(/[^\S]+/),
      regexpRule('VARIABLE', /[a-z]+/i),
      regexpRule('OPERATOR', /[+=]/i),
    ])
    expect(tokenize('a + b = c')).toEqual([
      expectToken('VARIABLE', 0, 'a'),
      expectToken('OPERATOR', 2, '+'),
      expectToken('VARIABLE', 4, 'b'),
      expectToken('OPERATOR', 6, '='),
      expectToken('VARIABLE', 8, 'c'),
    ])
  })

  test('should tokenize input (with last token)', () => {
    const tokenize = createTokenizer([
      regexpTest(/[^\S]+/),
      regexpRule('VARIABLE', /[a-z]+/i),
      regexpRule('OPERATOR', /[+=]/i),
    ], 'LT')
    expect(tokenize('a + b = c')).toEqual([
      expectToken('VARIABLE', 0, 'a'),
      expectToken('OPERATOR', 2, '+'),
      expectToken('VARIABLE', 4, 'b'),
      expectToken('OPERATOR', 6, '='),
      expectToken('VARIABLE', 8, 'c'),
      expectToken('LT', 9),
    ])
  })

  test('should tokenize empty input', () => {
    const tokenize = createTokenizer([])
    expect(tokenize('')).toEqual([])
  })

  test('should tokenize empty input (with last token)', () => {
    const tokenize = createTokenizer([], 'LT')
    expect(tokenize('')).toEqual([
      expectToken('LT', 0),
    ])
  })

})
