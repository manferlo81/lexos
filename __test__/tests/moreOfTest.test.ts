import { moreOfTest, regexpTest, stringTest } from '../../src'
import { expectTestResult } from '../tools/expect'

describe('moreOfTest function', () => {

  const testInteger = regexpTest(/\d+/)
  const testDash = stringTest('-')
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
      const expected = expectTestResult(input)
      expect(testId(input, 0)).toEqual(expected)
      inputsThatDoNotMatch.forEach((addition) => {
        expect(testId(`${input}${addition}`, 0)).toEqual(expected)
        expect(testId(`more ${input}${addition}`, 5)).toEqual(expected)
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
