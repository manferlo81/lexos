import { moreOfTest, regexpTest } from '../../src'

describe('moreOfTest function', () => {

  const testInteger = regexpTest(/\d+/)
  const testWord = regexpTest(/[a-z]+/i)

  test('should be a function', () => {
    const test = moreOfTest([testInteger, testWord])
    expect(typeof test === 'function').toBe(true)
  })

  test('should return falsy if it doesn\'t match any of the test', () => {
    const testId = moreOfTest([testInteger, testWord])
    const inputsThatDoNotMatch = [
      '??',
      '%^',
      '>>>>>',
    ]
    inputsThatDoNotMatch.forEach((input) => {
      expect(testId(input, 0)).toBeFalsy()
    })
  })

  test('should return result if it matches one or more tests', () => {
    const testId = moreOfTest([testInteger, testWord])
    const inputsThatMatch = [
      'word1234',
      '1234word',
      '1abc2b3c',
      'a1b256v3',
      'word1234text7890',
    ]
    const inputsThatDoNotMatch = [
      '??',
      '%^',
      '>>>>>',
    ]
    inputsThatMatch.forEach((input) => {
      const expected = { value: input, length: input.length }
      expect(testId(input, 0)).toEqual(expected)
      inputsThatDoNotMatch.forEach((addition) => {
        expect(testId(`${input} ${addition}`, 0)).toEqual(expected)
      })
    })
  })

})
