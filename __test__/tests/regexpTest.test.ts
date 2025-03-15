import { regexpTest } from '../../src'

describe('regexpRule function', () => {

  test('should be a function', () => {
    const integerRule = regexpTest(/\d+/)
    expect(typeof integerRule === 'function').toBe(true)
  })

  test('should return falsy if input doesn\'t match', () => {
    const integerRule = regexpTest(/\d+/)
    const inputsThatDoNotMatch = [
      'text',
    ]
    inputsThatDoNotMatch.forEach((input) => {
      expect(integerRule(input, 0)).toBeFalsy()
    })
  })

  test('should return result if input matches', () => {
    const integerRule = regexpTest(/\d+/)
    const inputsThatMatch = [
      '1234',
      '7890',
    ]
    inputsThatMatch.forEach((input) => {
      const expected = {
        length: input.length,
        value: input,
      }
      expect(integerRule(input, 0)).toEqual(expected)
      expect(integerRule(`${input} and more`, 0)).toEqual(expected)
    })
  })

})
