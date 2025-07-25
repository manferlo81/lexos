import { regexpTest, ruleTest, sequentialTest } from '../../src'

describe('sequentialTest function', () => {

  const testInteger = regexpTest(/\d+/)
  const testDash = ruleTest((input, pos) => {
    const inputLength = input.length
    let length = 0
    while (pos + length < inputLength && input[pos + length] === '-') length += 1
    return length
  })
  const testWord = regexpTest(/[a-z]+/i)

  test('should be a function', () => {
    const testId = sequentialTest([testWord, testInteger])
    expect(typeof testId === 'function').toBe(true)
  })

  test('should return result only if input matches in the right order', () => {
    const testId = sequentialTest([testWord, testDash, testInteger])
    const inputsThatMatchSequentially = [
      'word-7890',
      'X-99',
    ]
    inputsThatMatchSequentially.forEach((input) => {
      const expected = input.length
      expect(testId(input, 0)).toBe(expected)
      expect(testId(`${input} and more`, 0)).toBe(expected)
      expect(testId(`more ${input}`, 5)).toBe(expected)
      expect(testId(`more ${input} and more`, 5)).toBe(expected)
    })
  })

  test('should return falsy if input doesn\'t match', () => {
    const testId = sequentialTest([testWord, testDash, testInteger])
    const inputThatDoNotMathSequentially = [
      '1234',
      '-1234',
      'word',
      'word-',
      '1234-word',
      'word7890',
      '1234-text-6789',
    ]
    inputThatDoNotMathSequentially.forEach((value) => {
      expect(testId(value, 0)).toBeFalsy()
    })
  })

  test('should return falsy if no input precessed', () => {
    const testId = sequentialTest([])
    const inputThatDoNotMathSequentially = [
      '1234',
      '-1234',
      'word',
      'word-',
      '1234-word',
      'word7890',
      '1234-text-6789',
    ]
    inputThatDoNotMathSequentially.forEach((value) => {
      expect(testId(value, 0)).toBeFalsy()
    })
  })

})
