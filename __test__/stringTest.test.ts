import { stringTest } from '../src'

describe('stringTest function', () => {

  test('should throw if an empty string is passed', () => {
    const exec = () => stringTest('')
    expect(exec).toThrow()
  })

  describe('case sensitive', () => {

    test('should be a function', () => {
      const testKeyword = stringTest('keyword')
      expect(typeof testKeyword === 'function').toBe(true)
    })

    test('should return falsy if it doesn\'t match', () => {
      const testKeyword = stringTest('keyword')
      const inputsThatDoNotMatch = [
        'other',
        'text',
        'anything',
      ]
      inputsThatDoNotMatch.forEach((input) => {
        expect(testKeyword(input, 0)).toBeFalsy()
      })
    })

    test('should return falsy if it matches value but not casing', () => {
      const testKeyword = stringTest('keyword')
      const inputsThatDoNotMatchCasing = [
        'Keyword',
        'KeyWord',
        'keyWord',
      ]
      inputsThatDoNotMatchCasing.forEach((input) => {
        expect(testKeyword(input, 0)).toBeFalsy()
      })
    })

    test('should return result if it matches', () => {
      const inputThatMatches = 'keyword'
      const testKeyword = stringTest(inputThatMatches)
      const expected = { value: inputThatMatches, length: inputThatMatches.length }
      expect(testKeyword(inputThatMatches, 0)).toEqual(expected)
      expect(testKeyword(`${inputThatMatches} and more`, 0)).toEqual(expected)
    })

  })

  describe('case insensitive', () => {

    test('should be a function', () => {
      const testKeyword = stringTest('keyword', true)
      expect(typeof testKeyword === 'function').toBe(true)
    })

    test('should return falsy if it doesn\'t match', () => {
      const testKeyword = stringTest('keyword', true)
      const inputsThatDoNotMatch = [
        'other',
        'text',
        'anything',
      ]
      inputsThatDoNotMatch.forEach((input) => {
        expect(testKeyword(input, 0)).toBeFalsy()
      })
    })

    test('should return result if it matches ignoring casing', () => {
      const testKeyword = stringTest('keyword', true)
      const inputsThatMatch = [
        'keyword',
        'Keyword',
        'KeyWord',
        'keyWord',
      ]
      inputsThatMatch.forEach((input) => {
        const expected = { value: input, length: input.length }
        expect(testKeyword(input, 0)).toEqual(expected)
        expect(testKeyword(`${input} and more`, 0)).toEqual(expected)
      })
    })

  })

})
