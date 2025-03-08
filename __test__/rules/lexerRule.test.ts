import { lexerRule, regexpRule, regexpTest, stringRule } from '../../src'

describe('lexerRule function', () => {

  test('should be a function', () => {
    const rule = lexerRule(() => null, [])
    expect(typeof rule === 'function').toBe(true)
  })

  test('should return falsy if input doesn\'t match', () => {
    const realNumberRule = lexerRule(regexpTest(/\d+\.\d+/), [
      regexpRule(/\d+/, 'Digits'),
      regexpRule(/\./, 'DecimalPoint'),
    ])
    const inputsThatDoNotMatch = [
      '147',
      '.12',
      '56.',
    ]
    inputsThatDoNotMatch.forEach((input) => {
      expect(realNumberRule(input, 0)).toBeFalsy()
    })
  })

  test('should return falsy if the rule didn\'t process any code', () => {
    const realNumberRule = lexerRule(regexpTest(/\d+\.\d+/), [

    ])
    const inputsThatDoNotMatch = [
      '45.45',
    ]
    inputsThatDoNotMatch.forEach((input) => {
      expect(realNumberRule(input, 0)).toBeFalsy()
    })
  })

  test('should return result if input matches', () => {
    const digitsType = 'Digits'
    const decimalPointType = 'DecimalPoint'

    const realNumberRule = lexerRule(regexpTest(/\d+\.\d+/), [
      regexpRule(/\d+/, digitsType),
      stringRule('.', decimalPointType),
    ])

    const inputsThatMatch = [
      ['147', '0'],
      ['0', '12'],
      ['56', '0'],
      ['89', '55'],
      ['89', '55', 'and more'],
    ]
    inputsThatMatch.forEach(([integerPart, decimalPart, more]) => {
      const match = [integerPart, decimalPart].join('.')
      const input = more ? [match, more].join(' ') : match

      const result = realNumberRule(input, 0)

      const expected = {
        length: match.length,
        done: true,
        tokens: expect.any(Array) as never,
      }
      expect(result).toEqual(expected)

      if (!result) throw Error()
      const { tokens } = result

      expect(tokens).toEqual([
        { type: digitsType, value: integerPart, pos: 0 },
        { type: decimalPointType, value: '.', pos: integerPart.length },
        { type: digitsType, value: decimalPart, pos: integerPart.length + 1 },
      ])
    })
  })

})
