import { regexpTest, sequentialTest } from '../src'

describe('sequentialTest function', () => {

  const testInteger = regexpTest(/\d+/)
  const testWord = regexpTest(/[a-z]+/i)

  test('should be a function', () => {
    const testId = sequentialTest([testWord, testInteger])
    expect(typeof testId === 'function').toBe(true)
  })

  test('should return falsy if input doesn\'t match', () => {
    const testId = sequentialTest([testWord, testInteger, testWord])
    const inputsThatDoNotMatch = [
      '$#@*',
      '+_-=/*',
      '     ',
    ]
    inputsThatDoNotMatch.forEach((input) => {
      expect(testId(input)).toBeFalsy()
    })
  })

  test('should return falsy if input doesn\'t match in the right order', () => {
    const testId = sequentialTest([testWord, testInteger, testWord])
    const inputThatDoNotMathSequentially = [
      '1234',
      'word',
      '1234word',
      'word7890',
      '1234text6789',
    ]
    inputThatDoNotMathSequentially.forEach((value) => {
      expect(testId(value)).toBeFalsy()
    })
  })

  test('should return result only if input matches in the right order', () => {
    const testId = sequentialTest([testWord, testInteger, testWord])
    const inputsThatMatchSequentially = [
      'word7890word',
      'X99Z',
    ]
    inputsThatMatchSequentially.forEach((input) => {
      const expected = { value: input, length: input.length }
      expect(testId(input)).toEqual(expected)
      expect(testId(`${input} >>>>>`)).toEqual(expected)
    })
  })

})
