import { isArray, isType } from '../../src/tools/is'

describe('isType & isArray internal functions', () => {

  describe('isType internal function', () => {

    test('should return true if value matches type', () => {
      const cases = [
        ['string', ['', 'string']] as const,
        ['number', [0, 1, -1]] as const,
        ['function', [() => null, isType, isArray]] as const,
        ['object', [[], {}, null]] as const,
      ]
      cases.forEach(([type, values]) => {
        values.forEach((value) => {
          expect(isType(value, type)).toBe(true)
        })
      })
    })

    test('should return true if value matches one of the types', () => {
      const cases = [
        [['string', 'number'], ['string', 10]] as const,
        [['number', 'object'], [10, {}, [], 0]] as const,
        [['function', 'number'], [100, () => null, isArray]] as const,
        [['object', 'string'], [{}, [], '', 'string']] as const,
      ]
      cases.forEach(([[type, ...types], values]) => {
        values.forEach((value) => {
          expect(isType(value, type, ...types)).toBe(true)
        })
      })
    })

    test('should return false if value doesn\'t match any of the types', () => {
      const cases = [
        [['string', 'number'], [true, null, () => null, isType]] as const,
        [['number', 'function'], ['', 'string', false, null, {}, []]] as const,
        [['function', 'string'], [0, 1, {}, [], null]] as const,
        [['object', 'number'], ['', 'string', true]] as const,
      ]
      cases.forEach(([[type, ...types], values]) => {
        values.forEach((value) => {
          expect(isType(value, type, ...types)).toBe(false)
        })
      })
    })

  })

  describe('isArray internal function', () => {

    test('should return true if input is an array', () => {
      const inputs = [
        [],
        [0, 1],
        ['ok', 0, true],
      ]
      inputs.forEach((input) => {
        expect(isArray(input)).toBe(true)
      })
    })

    test('should return false if input is not an array', () => {
      const inputs = [
        '',
        'string',
        10,
        true,
        {},
        null,
        () => null,
      ]
      inputs.forEach((input) => {
        expect(isArray(input)).toBe(false)
      })
    })

  })

})
