import { ruleTest } from '../../src'
import { expectTestResult } from '../tools/expect'

describe('ruleTest function', () => {

  describe('function test', () => {

    test('should return function back', () => {
      const inputTest = () => null
      const outputTest = ruleTest(inputTest)
      expect(outputTest).toBe(inputTest)
    })

  })

  describe('RegExp test', () => {

    test('should be a function', () => {
      const testInteger = ruleTest(/\d+/)
      expect(typeof testInteger === 'function').toBe(true)
    })

    test('should return result if input matches', () => {
      const testInteger = ruleTest(/\d+/)
      const inputsThatMatch = [
        '1234',
        '55',
      ]
      inputsThatMatch.forEach((input) => {
        const expected = expectTestResult(input)
        expect(testInteger(input, 0)).toEqual(expected)
        expect(testInteger(`${input} and more`, 0)).toEqual(expected)
        expect(testInteger(`more ${input}`, 5)).toEqual(expected)
        expect(testInteger(`more ${input} and more`, 5)).toEqual(expected)
      })
    })

    test('should return falsy if input doesn\'t match', () => {
      const testInteger = ruleTest(/\d+/)
      const inputsThatDoNotMatch = [
        'test',
        'other test',
      ]
      inputsThatDoNotMatch.forEach((input) => {
        expect(testInteger(input, 0)).toBeFalsy()
      })
    })

    test('should return falsy if it doesn\'t match at the correct position', () => {
      const testInteger = ruleTest(/\d+/)
      const inputsThatMatchAfter = [
        'text-1234',
        'x45',
        'anything 99',
      ]
      inputsThatMatchAfter.forEach((input) => {
        expect(testInteger(input, 0)).toBeFalsy()
      })
    })

  })

  describe('string test', () => {

    describe('string test case sensitive', () => {

      test('should throw if zero length value passed', () => {
        const exec = () => ruleTest('')
        expect(exec).toThrow('Zero length string test')
      })

      test('should be a function', () => {
        const test = ruleTest('string')
        expect(typeof test === 'function').toBe(true)
      })

      test('should return result if input matches', () => {
        const keyword = 'keyword'
        const testKeyword = ruleTest(keyword)
        const expected = expectTestResult(keyword)
        expect(testKeyword(keyword, 0)).toEqual(expected)
        expect(testKeyword(`${keyword} and more`, 0)).toEqual(expected)
        expect(testKeyword(`more ${keyword}`, 5)).toEqual(expected)
        expect(testKeyword(`more ${keyword} and more`, 5)).toEqual(expected)
      })

      test('should return falsy if input doesn\'t match', () => {
        const testKeyword = ruleTest('keyword')
        const inputsThatDoNotMatch = [
          'otherword',
          'Keyword',
          'KeyWord',
          'keyWord',
          '  keyword',
        ]
        inputsThatDoNotMatch.forEach((input) => {
          expect(testKeyword(input, 0)).toBeFalsy()
          expect(testKeyword(input, 1)).toBeFalsy()
        })
      })

    })

    describe('string test case insensitive', () => {

      test('should throw if zero length value passed', () => {
        const exec = () => ruleTest('', true)
        expect(exec).toThrow('Zero length string test')
      })

      test('should be a function', () => {
        const test = ruleTest('string', true)
        expect(typeof test === 'function').toBe(true)
      })

      test('should return result if input matches', () => {
        const testKeyword = ruleTest('keyword', true)
        const inputsThatMatch = [
          'keyword',
          'Keyword',
          'KeyWord',
          'keyWord',
        ]
        inputsThatMatch.forEach((input) => {
          const expected = expectTestResult(input)
          expect(testKeyword(input, 0)).toEqual(expected)
          expect(testKeyword(`${input} and more`, 0)).toEqual(expected)
          expect(testKeyword(`more ${input}`, 5)).toEqual(expected)
          expect(testKeyword(`more ${input} and more`, 5)).toEqual(expected)
        })
      })

      test('should return falsy if input doesn\'t match', () => {
        const testKeyword = ruleTest('keyword', true)
        const inputsThatDoNotMatch = [
          'otherword',
          '  keyword',
        ]
        inputsThatDoNotMatch.forEach((input) => {
          expect(testKeyword(input, 0)).toBeFalsy()
          expect(testKeyword(input, 1)).toBeFalsy()
        })
      })

    })

  })

  describe('string array', () => {

    describe('string array test case sensitive', () => {

      test('should throw if zero length value passed', () => {
        const arraysWithZeroLengthValues = [
          ['', 'string', 'array'],
          ['string', 'array', ''],
        ]
        arraysWithZeroLengthValues.forEach((values) => {
          const exec = () => ruleTest(values)
          expect(exec).toThrow('Zero length string test')
        })
      })

      test('should be a function', () => {
        const test = ruleTest(['string', 'array'])
        expect(typeof test === 'function').toBe(true)
      })

      test('should return result if input matches', () => {
        const test = ruleTest(['string', 'array'])
        const inputsThatMatch = [
          'string',
          'array',
        ]
        inputsThatMatch.forEach((input) => {
          const expected = expectTestResult(input)
          expect(test(input, 0)).toEqual(expected)
          expect(test(`${input} and more`, 0)).toEqual(expected)
          expect(test(`more ${input}`, 5)).toEqual(expected)
          expect(test(`more ${input} and more`, 5)).toEqual(expected)
        })
      })

    })

    describe('string array test case insensitive', () => {

      test('should throw if zero length value passed', () => {
        const arraysWithZeroLengthValues = [
          ['', 'string', 'array'],
          ['string', 'array', ''],
        ]
        arraysWithZeroLengthValues.forEach((values) => {
          const exec = () => ruleTest(values, true)
          expect(exec).toThrow('Zero length string test')
        })
      })

      test('should be a function', () => {
        const test = ruleTest(['string', 'array'], true)
        expect(typeof test === 'function').toBe(true)
      })

      test('should return result if input matches', () => {
        const test = ruleTest(['string', 'array'], true)
        const inputsThatMatch = [
          'string',
          'String',
          'STRING',
          'array',
          'Array',
          'ARRAY',
        ]
        inputsThatMatch.forEach((input) => {
          const expected = expectTestResult(input)
          expect(test(input, 0)).toEqual(expected)
          expect(test(`${input} and more`, 0)).toEqual(expected)
          expect(test(`more ${input}`, 5)).toEqual(expected)
          expect(test(`more ${input} and more`, 5)).toEqual(expected)
        })
      })

    })

  })

})
