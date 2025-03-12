import { createTokenizer, regexpRule, regexpTest, stringRule } from '../src'

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
    expect(tokenize('a + b = c')).toEqual([
      { type: 'VARIABLE', value: 'a', pos: 0 },
      { type: 'OPERATOR', value: '+', pos: 2 },
      { type: 'VARIABLE', value: 'b', pos: 4 },
      { type: 'OPERATOR', value: '=', pos: 6 },
      { type: 'VARIABLE', value: 'c', pos: 8 },
    ])
  })

  test('should tokenize empty input', () => {
    const tokenize = createTokenizer([])
    expect(tokenize('')).toEqual([])
  })

})
