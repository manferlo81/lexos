import { stringRule } from '../../src'

describe('stringRule function', () => {

  describe('case sensitive', () => {

    test('should throw if an empty string is passed', () => {
      const exec = () => stringRule('', 'EmptyString')
      expect(exec).toThrow()
    })

    test('should be a function', () => {
      const rule = stringRule('keyword', 'Keyword')
      expect(typeof rule == 'function').toBe(true)
    })

    test('should return falsy is it doesn\'t match', () => {
      const rule = stringRule('keyword', 'Keyword')
      const inputsThatDoNotMatch = [
        'text',
        'other text',
        'Keyword',
        'KeyWord',
        'keyWord',
        'KEYWORD',
      ]
      inputsThatDoNotMatch.forEach((input) => {
        expect(rule(input, 0)).toBeFalsy()
      })
    })

    test('should return result if input matches', () => {
      const type = 'Keyword'
      const rule = stringRule('keyword', type)
      const values = [
        'keyword',
      ]
      values.forEach((input) => {
        const expected = { type, value: input, length: input.length }
        expect(rule(input, 0)).toEqual(expected)
        expect(rule(`${input} and more`, 0)).toEqual(expected)
      })
    })

  })

  describe('case insensitive', () => {

    test('should throw if an empty string is passed', () => {
      const exec = () => stringRule('', 'EmptyString', true)
      expect(exec).toThrow()
    })

    test('should be a function', () => {
      const rule = stringRule('keyword', 'Keyword', true)
      expect(typeof rule == 'function').toBe(true)
    })

    test('should return falsy is it doesn\'t match', () => {
      const rule = stringRule('keyword', 'Keyword', true)
      const inputsThatDoNotMatch = [
        'word',
      ]
      inputsThatDoNotMatch.forEach((input) => {
        expect(rule(input, 0)).toBeFalsy()
      })

    })

    test('should return result if input matches', () => {
      const type = 'Keyword'
      const rule = stringRule('keyword', type, true)
      const inputsThatMatch = [
        'keyword',
        'Keyword',
        'KeyWord',
        'keyWord',
        'KEYWORD',
      ]
      inputsThatMatch.forEach((input) => {
        const expected = { value: input, length: input.length, type }
        expect(rule(input, 0)).toEqual(expected)
        expect(rule(`${input} and more`, 0)).toEqual(expected)
      })
    })

  })

})
