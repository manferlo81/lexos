import { regexpRule } from '../../src'

describe('regexpRule function', () => {

  test('should be a function', () => {
    const integerRule = regexpRule(/\d+/, 'Integer')
    expect(typeof integerRule === 'function').toBe(true)
  })

  test('should return falsy if input doesn\'t match', () => {
    const integerRule = regexpRule(/\d+/, 'Integer')
    const inputsThatDoNotMatch = [
      'text',
    ]
    inputsThatDoNotMatch.forEach((input) => {
      expect(integerRule(input, 0)).toBeFalsy()
    })
  })

  test('should return result if input matches', () => {
    const type = 'Integer'
    const integerRule = regexpRule(/\d+/, type)
    const inputsThatMatch = [
      '1234',
      '7890',
    ]
    inputsThatMatch.forEach((input) => {
      const expected = {
        length: input.length,
        token: {
          type,
          value: input,
        },
      }
      expect(integerRule(input, 0)).toEqual(expected)
      expect(integerRule(`${input} and more`, 0)).toEqual(expected)
    })
  })

})
