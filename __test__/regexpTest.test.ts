import { regexpTest } from '../src'

describe('regexpTest function', () => {

  test('should be a function', () => {
    const testInteger = regexpTest(/\d+/)
    expect(typeof testInteger === 'function').toBe(true)
  })

  test('should return falsy if it doesn\'t match', () => {
    const testInteger = regexpTest(/\d+/)
    const inputsThatDoNotMatch = [
      'test',
      'other test',
    ]
    inputsThatDoNotMatch.forEach((input) => {
      expect(testInteger(input)).toBeFalsy()
    })
  })

  test('should return falsy if it doesn\'t match the very beginning', () => {
    const testInteger = regexpTest(/\d+/)
    const inputsThatMatchAfter = [
      'text-1234',
      'x45',
    ]
    inputsThatMatchAfter.forEach((input) => {
      expect(testInteger(input)).toBeFalsy()
    })
  })

  test('should return falsy if it matches but generates an empty value', () => {
    const test = regexpTest(/\d*/)
    expect(test('text')).toBeFalsy()
  })

  test('should return result if it matches', () => {
    const testInteger = regexpTest(/\d+/)
    const inputsThatMatch = [
      '1234',
      '55',
    ]
    inputsThatMatch.forEach((input) => {
      const expected = { value: input, length: input.length }
      expect(testInteger(input)).toEqual(expected)
      expect(testInteger(`${input} and more`)).toEqual(expected)
    })
  })

})
