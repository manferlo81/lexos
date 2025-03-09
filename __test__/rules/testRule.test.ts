import type { Test } from '../../src'
import { regexpTest, stringTest, testRule } from '../../src'

describe('testRule function', () => {

  test('should be a function', () => {
    const rule = testRule(() => null, 'Type')
    expect (typeof rule === 'function').toBe(true)
  })

  test('should return falsy if input doesn\'t match', () => {
    const testOk = stringTest('ok')
    const okRule = testRule(testOk, 'Ok')
    expect(okRule('not ok', 0)).toBeFalsy()
  })

  test('should return result if input matches', () => {
    const digitsTest = regexpTest(/\d+/)
    const type = 'Digits'
    const starStringRule = testRule(digitsTest, type)
    const inputsThatMatch = [
      '1234',
      '89',
      '0',
      '12',
    ]
    inputsThatMatch.forEach((input) => {
      const expected = {
        length: input.length,
        token: {
          type,
          value: input,
        },
      }
      expect(starStringRule(input, 0)).toEqual(expected)
      expect(starStringRule(`${input} and more`, 0)).toEqual(expected)
    })
  })

  test('should return result if input matches (using custom test)', () => {
    const starStringTest: Test = (code, pos) => {
      if (code.length - pos < 4) return
      if (code[pos] !== '*') return
      if (code[pos + 3] !== '*') return
      return { value: code.substring(pos, pos + 4), length: 4 }
    }
    const type = 'StartString'
    const starStringRule = testRule(starStringTest, type)

    const inputsThatMatch = [
      '*56*',
      '*XX*',
      '*--*',
      '*!?*',
    ]

    inputsThatMatch.forEach((input) => {
      const expected = {
        length: 4,
        token: {
          type,
          value: input,
        },
      }
      expect(starStringRule(input, 0)).toEqual(expected)
      expect(starStringRule(`${input} and more`, 0)).toEqual(expected)
    })
  })

})
