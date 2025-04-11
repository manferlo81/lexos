import { regexpRule } from '../../src'
import { expectSingleTokenResult } from '../tools/expect'

describe('regexpRule function', () => {

  test('should be a function', () => {
    const integerRule = regexpRule('Integer', /\d+/)
    expect(typeof integerRule === 'function').toBe(true)
  })

  test('should return result if input matches', () => {
    const type = 'Integer'
    const integerRule = regexpRule(type, /\d+/)
    const inputsThatMatch = [
      '1234',
      '7890',
    ]
    inputsThatMatch.forEach((input) => {
      const expected = expectSingleTokenResult(input, type)
      expect(integerRule(input, 0)).toEqual(expected)
      expect(integerRule(`${input} and more`, 0)).toEqual(expected)
    })
  })

  test('should return falsy if input doesn\'t match', () => {
    const integerRule = regexpRule('Integer', /\d+/)
    const inputsThatDoNotMatch = [
      'text',
    ]
    inputsThatDoNotMatch.forEach((input) => {
      expect(integerRule(input, 0)).toBeFalsy()
    })
  })

})
