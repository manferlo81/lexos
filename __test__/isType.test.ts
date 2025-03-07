import { isType } from '../src/is'

describe('isType function', () => {

  const strings = [
    'string',
    'text',
    'other',
  ]

  const functions = [
    () => null,
    isType,
  ]

  test('should test for string', () => {
    strings.forEach((value) => {
      expect(isType(value, 'string')).toBe(true)
    })
    functions.forEach((value) => {
      expect(isType(value, 'string')).toBe(false)
    })
  })

  test('should test for function', () => {
    functions.forEach((value) => {
      expect(isType(value, 'function')).toBe(true)
    })
    strings.forEach((value) => {
      expect(isType(value, 'function')).toBe(false)
    })
  })

})
