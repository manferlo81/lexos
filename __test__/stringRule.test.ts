import { stringRule } from '../src'

describe('stringRule function', () => {

  test('should be a function', () => {
    const rule = stringRule('text', 'Text')
    expect(typeof rule == 'function').toBe(true)
  })

  describe('case sensitive', () => {

    test('should return falsy is it doesn\'t match', () => {
      const rule = stringRule('text', 'Text')
      const values = [
        'word',
        'teXT',
        'tEXT',
      ]
      values.forEach((input) => {
        expect(rule(input)).toBeFalsy()
      })
    })

    test('should return result if input matches', () => {
      const type = 'Text'
      const rule = stringRule('text', type)
      const values = [
        'text',
      ]
      values.forEach((input) => {
        const length = input.length
        const expected = { length, tokens: [{ value: input, pos: 0, type }], done: true }
        expect(rule(input)).toEqual(expected)
        expect(rule(`${input}-more`)).toEqual(expected)
      })
    })

  })

  describe('case insensitive', () => {

    test('should return falsy is it doesn\'t match', () => {
      const rule = stringRule('text', 'Text', true)
      expect(rule('word')).toBeFalsy()
    })

    test('should return result if input matches', () => {
      const type = 'Text'
      const rule = stringRule('text', type, true)
      const values = [
        'text',
        'TexT',
        'tEXt',
      ]
      values.forEach((input) => {
        const length = input.length
        const expected = { length, tokens: [{ value: input, pos: 0, type }], done: true }
        expect(rule(input)).toEqual(expected)
        expect(rule(`${input}-more`)).toEqual(expected)
      })
    })

  })

})
