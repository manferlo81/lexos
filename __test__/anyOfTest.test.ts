import { anyOfTest, regexpTest } from '../src'

describe('anyOfTest function', () => {

  const testInteger = regexpTest(/\d+/)
  const testWord = regexpTest(/[a-z]+/i)

  test('should be a function', () => {
    const test = anyOfTest([testInteger, testWord])
    expect(typeof test === 'function').toBe(true)
  })

  test('should return falsy if it doesn\'t match', () => {
    const testId = anyOfTest([testInteger, testWord])
    const inputsThatDoNotMatch = [
      '??',
      '%^',
    ]
    inputsThatDoNotMatch.forEach((input) => {
      expect(testId(input)).toBeFalsy()
    })
  })

  // test('should return falsy if it doesn\'t match the whole input', () => {
  //   const testId = anyOfTest([testInteger, testWord])
  //   const inputsThatMatch = [
  //     'word1234',
  //     '1234word',
  //     '1a2b3c',
  //     'a1b2v3',
  //   ]
  //   const inputsThatDoNotMatch = [
  //     '??',
  //     '%^',
  //   ]
  //   inputsThatMatch.forEach((matches) => {
  //     inputsThatDoNotMatch.forEach((doNotMatch) => {
  //       expect(testId(`${matches}${doNotMatch}`)).toBeFalsy()
  //     })
  //   })
  // })

  test('should return result if it matches', () => {
    const testId = anyOfTest([testInteger, testWord])
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
    ]
    inputsThatMatch.forEach((input) => {
      const expected = { value: input, length: input.length }
      expect(testId(input)).toEqual(expected)
      inputsThatDoNotMatch.forEach((addition) => {
        expect(testId(`${input} ${addition}`)).toEqual(expected)
      })
    })
  })

})
