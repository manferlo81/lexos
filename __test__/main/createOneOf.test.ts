import { createOneOf, regexpTest, testRule } from '../../src'
import { expectSingleTokenResult, expectTestResult } from '../tools/expect'

describe('createOneOf function', () => {

  test('should return first rule is only one provided', () => {
    const firstRule = () => null
    const resultingRule = createOneOf([firstRule])
    expect(resultingRule).toBe(firstRule)
  })

  const testInteger = regexpTest(/[1-9]\d*/)
  const testWord = regexpTest(/[a-z]+/i)

  test('should be a function', () => {
    const testWordOrNumber = createOneOf([testWord, testInteger])
    expect(typeof testWordOrNumber === 'function').toBe(true)
  })

  test('should return first test result that matches', () => {
    const testWordOrNumber = createOneOf([testWord, testInteger])
    const inputsThatMatch = [
      '1234',
      'word',
    ]
    inputsThatMatch.forEach((input) => {
      const expected = expectTestResult(input)
      expect(testWordOrNumber(input, 0)).toEqual(expected)
      expect(testWordOrNumber(`${input} and more`, 0)).toEqual(expected)
      expect(testWordOrNumber(`more ${input}`, 5)).toEqual(expected)
      expect(testWordOrNumber(`more ${input} and more`, 5)).toEqual(expected)
    })
  })

  test('should return first rule result that matches', () => {
    const wordType = 'WORD'
    const integerType = 'INT'
    const testWordOrNumber = createOneOf([
      testRule(wordType, testWord),
      testRule(integerType, testInteger),
    ])
    const inputsThatMatch = [
      ['1234', integerType],
      ['word', wordType],
    ]
    inputsThatMatch.forEach(([input, expectType]) => {
      const expected = expectSingleTokenResult(input, expectType)
      expect(testWordOrNumber(input, 0)).toEqual(expected)
      expect(testWordOrNumber(`${input} and more`, 0)).toEqual(expected)
      expect(testWordOrNumber(`more ${input}`, 5)).toEqual(expected)
      expect(testWordOrNumber(`more ${input} and more`, 5)).toEqual(expected)
    })
  })

  test('should return first test or rule result that matches', () => {
    const integerType = 'INT'
    const testWordOrNumber = createOneOf([testWord, testRule(integerType, testInteger)])
    const inputsThatMatch = [
      ['1234', integerType] as const,
      ['word', null] as const,
    ]
    inputsThatMatch.forEach(([input, expectType]) => {
      const expected = expectType
        ? expectSingleTokenResult(input, expectType)
        : expectTestResult(input)
      expect(testWordOrNumber(input, 0)).toEqual(expected)
      expect(testWordOrNumber(`${input} and more`, 0)).toEqual(expected)
      expect(testWordOrNumber(`more ${input}`, 5)).toEqual(expected)
      expect(testWordOrNumber(`more ${input} and more`, 5)).toEqual(expected)
    })
  })

  test('should return falsy if doesn\'t match any test or rule', () => {
    const testWordOrNumber = createOneOf([testWord, testInteger])
    const inputsThatDoNotMatch = [
      '$$-1234-word',
      '-word-1234',
    ]
    inputsThatDoNotMatch.forEach((input) => {
      expect(testWordOrNumber(input, 0)).toBeFalsy()
    })
  })

})
