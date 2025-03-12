import { oneOfRule, regexpTest, testRule } from '../../src'

describe('oneOfRule function', () => {

  const testInteger = regexpTest(/[1-9]\d*/)
  const testWord = regexpTest(/[a-z]+/i)

  test('should be a function', () => {
    const testWordOrNumber = oneOfRule([testWord, testInteger])
    expect(typeof testWordOrNumber === 'function').toBe(true)
  })

  test('should return falsy if doesn\'t match any test or rule', () => {
    const testWordOrNumber = oneOfRule([testWord, testInteger])
    const inputsThatDoNotMatch = [
      '$$-1234-word',
      '-word-1234',
    ]
    inputsThatDoNotMatch.forEach((input) => {
      expect(testWordOrNumber(input, 0)).toBeFalsy()
    })
  })

  test('should return first test result that matches', () => {
    const testWordOrNumber = oneOfRule([testWord, testInteger])
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

  test('should return first rule result that matches', () => {
    const wordType = 'WORD'
    const integerType = 'INT'
    const testWordOrNumber = oneOfRule([
      testRule(testWord, wordType),
      testRule(testInteger, integerType),
    ])
    const inputsThatMatch = [
      ['1234', integerType],
      ['word', wordType],
    ]
    inputsThatMatch.forEach(([input, expectType]) => {
      const expected = { length: input.length, token: { type: expectType, value: input } }
      expect(testWordOrNumber(input, 0)).toEqual(expected)
      expect(testWordOrNumber(`${input} and more`, 0)).toEqual(expected)
    })
  })

  test('should return first test or rule result that matches', () => {
    const integerType = 'INT'
    const testWordOrNumber = oneOfRule([testWord, testRule(testInteger, integerType)])
    const inputsThatMatch = [
      ['1234', integerType] as const,
      ['word', null] as const,
    ]
    inputsThatMatch.forEach(([input, expectType]) => {
      const length = input.length
      const expected = expectType
        ? { length, token: { type: expectType, value: input } }
        : { length, value: input }
      expect(testWordOrNumber(input, 0)).toEqual(expected)
      expect(testWordOrNumber(`${input} and more`, 0)).toEqual(expected)
    })
  })

})
