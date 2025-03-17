import { regexpTest } from '../../src'
import { expectedTestResult } from '../tools/create-result'

describe('regexpRule function', () => {

  test('should be a function', () => {
    const integerRule = regexpTest(/\d+/)
    expect(typeof integerRule === 'function').toBe(true)
  })

  test('should return result if input matches', () => {
    const integerRule = regexpTest(/\d+/)
    const inputsThatMatch = [
      '1234',
      '7890',
    ]
    inputsThatMatch.forEach((input) => {
      const expected = expectedTestResult(input)
      expect(integerRule(input, 0)).toEqual(expected)
      expect(integerRule(`${input} and more`, 0)).toEqual(expected)
      expect(integerRule(`more ${input}`, 5)).toEqual(expected)
      expect(integerRule(`more ${input} and more`, 5)).toEqual(expected)
    })
  })

  test('should return falsy if input doesn\'t match', () => {
    const integerRule = regexpTest(/\d+/)
    const inputsThatDoNotMatch = [
      'text',
      'more text',
      'any other text',
    ]
    inputsThatDoNotMatch.forEach((input) => {
      expect(integerRule(input, 0)).toBeFalsy()
    })
  })

  test('should return falsy if input doesn\'t match current position', () => {
    const integerRule = regexpTest(/\d+/)
    const inputsThatMatch = [
      '1234',
      '7890',
    ]
    inputsThatMatch.forEach((input) => {
      expect(integerRule(`more ${input}`, 0)).toBeFalsy()
      expect(integerRule(`${input} and more`, input.length)).toBeFalsy()
    })
  })

})
