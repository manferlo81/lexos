import { stringTest } from '../../src'
import { expectedTestResult } from '../tools/create-result'

describe('stringTest function', () => {

  describe('string test', () => {

    describe('string test case sensitive', () => {

      test('should throw if zero length value passed', () => {
        const exec = () => stringTest('')
        expect(exec).toThrow('Zero length string test')
      })

      test('should be a function', () => {
        const testKeyword = stringTest('keyword')
        expect(typeof testKeyword === 'function').toBe(true)
      })

      test('should return result if input matches', () => {
        const keyword = 'keyword'
        const testKeyword = stringTest(keyword)
        const expected = expectedTestResult(keyword)
        expect(testKeyword(keyword, 0)).toEqual(expected)
        expect(testKeyword(`${keyword} and more`, 0)).toEqual(expected)
        expect(testKeyword(`more ${keyword}`, 5)).toEqual(expected)
        expect(testKeyword(`more ${keyword} and more`, 5)).toEqual(expected)
      })

      test('should return falsy if input doesn\'t match', () => {
        const testKeyword = stringTest('keyword')
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
        const exec = () => stringTest('', true)
        expect(exec).toThrow('Zero length string test')
      })

      test('should be a function', () => {
        const testKeyword = stringTest('keyword', true)
        expect(typeof testKeyword === 'function').toBe(true)
      })

      test('should return result if input matches', () => {
        const testKeyword = stringTest('keyword', true)
        const inputsThatMatch = [
          'keyword',
          'Keyword',
          'KeyWord',
          'keyWord',
        ]
        inputsThatMatch.forEach((input) => {
          const expected = expectedTestResult(input)
          expect(testKeyword(input, 0)).toEqual(expected)
          expect(testKeyword(`${input} and more`, 0)).toEqual(expected)
          expect(testKeyword(`more ${input}`, 5)).toEqual(expected)
          expect(testKeyword(`more ${input} and more`, 5)).toEqual(expected)
        })
      })

      test('should return falsy if input doesn\'t match', () => {
        const testKeyword = stringTest('keyword', true)
        const inputsThatDoNotMatch = [
          'other word',
          'anything',
          '  keyword',
          '  Keyword',
          '  KeyWord',
          '  keyWord',
        ]
        inputsThatDoNotMatch.forEach((input) => {
          expect(testKeyword(input, 0)).toBeFalsy()
          expect(testKeyword(input, 1)).toBeFalsy()
        })
      })

    })

  })

  describe('string array test', () => {

    describe('string array test case sensitive', () => {

      test('should throw if zero length value passed', () => {
        const arraysWithZeroLengthValues = [
          ['', 'string', 'array'],
          ['string', 'array', ''],
        ]
        arraysWithZeroLengthValues.forEach((values) => {
          const exec = () => stringTest(values)
          expect(exec).toThrow('Zero length string test')
        })
      })

      test('should be a function', () => {
        const test = stringTest(['string', 'array'])
        expect(typeof test === 'function').toBe(true)
      })

      test('should return result if input matches', () => {
        const test = stringTest(['string', 'array'])
        const inputsThatMatch = [
          'string',
          'array',
        ]
        inputsThatMatch.forEach((input) => {
          const expected = expectedTestResult(input)
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
          const exec = () => stringTest(values, true)
          expect(exec).toThrow('Zero length string test')
        })
      })

      test('should be a function', () => {
        const test = stringTest(['string', 'array'], true)
        expect(typeof test === 'function').toBe(true)
      })

      test('should return result if input matches', () => {
        const test = stringTest(['string', 'array'], true)
        const inputsThatMatch = [
          'string',
          'String',
          'STRING',
          'array',
          'Array',
          'ARRAY',
        ]
        inputsThatMatch.forEach((input) => {
          const expected = expectedTestResult(input)
          expect(test(input, 0)).toEqual(expected)
          expect(test(`${input} and more`, 0)).toEqual(expected)
          expect(test(`more ${input}`, 5)).toEqual(expected)
          expect(test(`more ${input} and more`, 5)).toEqual(expected)
        })
      })

    })

  })

})
