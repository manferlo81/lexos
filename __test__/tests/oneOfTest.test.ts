import { oneOfTest, regexpTest } from '../../src'

describe('oneOfTest function', () => {

  const testInteger = regexpTest(/\d+/)
  const testWord = regexpTest(/[a-z]+/i)

  test('should be a function', () => {
    const testWordOrNumber = oneOfTest([testWord, testInteger])
    expect(typeof testWordOrNumber === 'function').toBe(true)
  })

  test('should return falsy if doesn\'t match any test', () => {
    const testWordOrNumber = oneOfTest([testWord, testInteger])
    const inputsThatDoNotMatch = [
      '$$-1234-word',
      '-word-1234',
    ]
    inputsThatDoNotMatch.forEach((input) => {
      expect(testWordOrNumber(input, 0)).toBeFalsy()
    })
  })

  test('should return first result that matches', () => {
    const testWordOrNumber = oneOfTest([testWord, testInteger])
    const inputsThatMatch = [
      '1234',
      'word',
    ]
    inputsThatMatch.forEach((input) => {
      const expected = { value: input, length: input.length }
      expect(testWordOrNumber(input, 0)).toEqual(expected)
      expect(testWordOrNumber(`${input} ???`, 0)).toEqual(expected)
    })
  })

})
