import { moreOfTest, regexpTest, ruleTest } from '../../src'

describe('moreOfTest function', () => {

  const testInteger = regexpTest(/\d+/)
  const testDash = ruleTest((input, pos) => {
    const inputLength = input.length
    let currentPos = pos
    while (currentPos < inputLength && input[currentPos] === '-') currentPos += 1
    return currentPos - pos
  })
  const testWord = regexpTest(/[a-z]+/i)

  test('should be a function', () => {
    const test = moreOfTest([testInteger, testWord, testDash])
    expect(typeof test === 'function').toBe(true)
  })

  test('should return result if it matches one or more tests', () => {
    const testId = moreOfTest([testInteger, testWord, testDash])
    const inputsThatMatch = [
      'word-1234',
      '1234-word',
      '1abc-2b3c',
      'a1b256v3---',
      'word-1234-text-7890',
    ]
    const inputsThatDoNotMatch = [
      '??',
      '$',
      '...',
    ]
    inputsThatMatch.forEach((input) => {
      const expected = input.length
      expect(testId(input, 0)).toBe(expected)
      inputsThatDoNotMatch.forEach((addition) => {
        expect(testId(`${input}${addition}`, 0)).toBe(expected)
        expect(testId(`more ${input}${addition}`, 5)).toBe(expected)
      })
    })
  })

  test('should return falsy if it doesn\'t match any of the test', () => {
    const testId = moreOfTest([testInteger, testWord, testDash])
    const inputsThatDoNotMatch = [
      '??',
      '%^',
      '>>>>>',
    ]
    inputsThatDoNotMatch.forEach((input) => {
      expect(testId(input, 0)).toBeFalsy()
    })
  })

})
