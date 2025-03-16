import { createTokenizer, regexpRule, regexpTest, stringRule } from '../src'
import { createToken } from './tools/create-token'

describe('createTokenizer function', () => {

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
      stringRule('print', 'KW'),
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
      regexpRule(/[a-z]+/i, 'VARIABLE'),
      regexpRule(/[+=]/i, 'OPERATOR'),
    ])
    const expectedTokens = [
      createToken('VARIABLE', 0, 'a'),
      createToken('OPERATOR', 2, '+'),
      createToken('VARIABLE', 4, 'b'),
      createToken('OPERATOR', 6, '='),
      createToken('VARIABLE', 8, 'c'),
    ]
    expect(tokenize('a + b = c')).toEqual(expectedTokens)
  })

  test('should tokenize input (with last token)', () => {
    const tokenize = createTokenizer([
      regexpTest(/[^\S]+/),
      regexpRule(/[a-z]+/i, 'VARIABLE'),
      regexpRule(/[+=]/i, 'OPERATOR'),
    ], 'LT')
    const expectedTokens = [
      createToken('VARIABLE', 0, 'a'),
      createToken('OPERATOR', 2, '+'),
      createToken('VARIABLE', 4, 'b'),
      createToken('OPERATOR', 6, '='),
      createToken('VARIABLE', 8, 'c'),
      createToken('LT', 9),
    ]
    expect(tokenize('a + b = c')).toEqual(expectedTokens)
  })

  test('should tokenize empty input', () => {
    const tokenize = createTokenizer([])
    expect(tokenize('')).toEqual([])
  })

  test('should tokenize empty input (with last token)', () => {
    const tokenize = createTokenizer([], 'LT')
    const expectedToken = createToken('LT', 0)
    expect(tokenize('')).toEqual([expectedToken])
  })

})
