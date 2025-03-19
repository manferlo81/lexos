import { stringRule } from '../../src'
import { expectSingleTokenResult } from '../tools/expect'

describe('stringRule function', () => {

  describe('case sensitive', () => {

    test('should throw if an empty string is passed', () => {
      const exec = () => stringRule('EmptyString', '')
      expect(exec).toThrow('Zero length string test')
    })

    test('should be a function', () => {
      const rule = stringRule('Keyword', 'keyword')
      expect(typeof rule == 'function').toBe(true)
    })

    test('should return result if input matches', () => {
      const type = 'Keyword'
      const rule = stringRule(type, 'keyword')
      const values = [
        'keyword',
      ]
      values.forEach((input) => {
        const expected = expectSingleTokenResult(input, type)
        expect(rule(input, 0)).toEqual(expected)
        expect(rule(`${input} and more`, 0)).toEqual(expected)
        expect(rule(`more ${input}`, 5)).toEqual(expected)
        expect(rule(`more ${input} and more`, 5)).toEqual(expected)
      })
    })

    test('should return falsy is it doesn\'t match', () => {
      const rule = stringRule('KW', 'keyword')
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

  })

  describe('case insensitive', () => {

    test('should throw if an empty string is passed', () => {
      const exec = () => stringRule('EmptyString', '', true)
      expect(exec).toThrow('Zero length string test')
    })

    test('should be a function', () => {
      const rule = stringRule('Keyword', 'keyword', true)
      expect(typeof rule == 'function').toBe(true)
    })

    test('should return result if input matches', () => {
      const type = 'Keyword'
      const rule = stringRule(type, 'keyword', true)
      const inputsThatMatch = [
        'keyword',
        'Keyword',
        'KeyWord',
        'keyWord',
        'KEYWORD',
      ]
      inputsThatMatch.forEach((input) => {
        const expected = expectSingleTokenResult(input, type)
        expect(rule(input, 0)).toEqual(expected)
        expect(rule(`${input} and more`, 0)).toEqual(expected)
        expect(rule(`more ${input}`, 5)).toEqual(expected)
        expect(rule(`more ${input} and more`, 5)).toEqual(expected)
      })
    })

    test('should return falsy is it doesn\'t match', () => {
      const rule = stringRule('Keyword', 'keyword', true)
      const inputsThatDoNotMatch = [
        'word',
      ]
      inputsThatDoNotMatch.forEach((input) => {
        expect(rule(input, 0)).toBeFalsy()
      })

    })

  })

})
