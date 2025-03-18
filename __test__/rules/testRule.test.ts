import type { Test } from '../../src'
import { regexpTest, testRule } from '../../src'
import { expectedTestResult, expectedTokenResult } from '../tools/create-result'

describe('testRule function', () => {

  test('should be a function', () => {
    const rule = testRule('ALL', (input) => ({ value: input, length: input.length }))
    expect (typeof rule === 'function').toBe(true)
  })

  test('should return result if input matches', () => {
    const digitsTest = regexpTest(/\d+/)
    const type = 'Digits'
    const starStringRule = testRule(type, digitsTest)
    const inputsThatMatch = [
      '1234',
      '89',
      '0',
      '12',
    ]
    inputsThatMatch.forEach((input) => {
      const expected = expectedTokenResult(input, type)
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
    const starStringRule = testRule(type, starStringTest)

    const inputsThatMatch = [
      '*56*',
      '*XX*',
      '*--*',
      '*!?*',
    ]

    inputsThatMatch.forEach((input) => {
      const expected = expectedTokenResult(input, type)
      expect(starStringRule(input, 0)).toEqual(expected)
      expect(starStringRule(`${input} and more`, 0)).toEqual(expected)
    })
  })

  test('should return result if input matches using dynamic type', () => {
    const integerOrIdTest = regexpTest(/(?:0)|(?:[1-9][0-9]*)|([a-zA-Z][\w_$]*)/)
    const integerType = 'INT'
    const idType = 'ID'

    const starStringRule = testRule(
      (value) => {
        if (Number.isFinite(+value)) return integerType
        return idType
      },
      integerOrIdTest,
    )

    const inputsThatMatch = [
      ['1234', integerType],
      ['89', integerType],
      ['0', integerType],
      ['12', integerType],
      ['AnId', idType],
      ['Id2025', idType],
    ]

    inputsThatMatch.forEach(([input, type]) => {
      const expected = expectedTokenResult(input, type)
      expect(starStringRule(input, 0)).toEqual(expected)
      expect(starStringRule(`${input} and more`, 0)).toEqual(expected)
      expect(starStringRule(`more ${input}`, 5)).toEqual(expected)
      expect(starStringRule(`more ${input} and more`, 5)).toEqual(expected)
    })
  })

  test('should return test result if dynamic type returns nullish', () => {
    const integerOrIdTest = regexpTest(/(?:0)|(?:[1-9][0-9]*)|([a-zA-Z][\w_$]*)/)
    const integerType = 'INT'

    const starStringRule = testRule(
      (value) => {
        if (Number.isFinite(+value)) return integerType
      },
      integerOrIdTest,
    )

    const inputsThatMatch = [
      ['1234', integerType] as const,
      ['89', integerType] as const,
      ['0', integerType] as const,
      ['12', integerType] as const,
      ['AnId', null] as const,
      ['Id2025', null] as const,
    ]

    inputsThatMatch.forEach(([input, type]) => {
      const expected = type
        ? expectedTokenResult(input, type)
        : expectedTestResult(input)
      expect(starStringRule(input, 0)).toEqual(expected)
      expect(starStringRule(`${input} and more`, 0)).toEqual(expected)
      expect(starStringRule(`more ${input}`, 5)).toEqual(expected)
      expect(starStringRule(`more ${input} and more`, 5)).toEqual(expected)
    })
  })

  test('should return falsy if input doesn\'t match', () => {
    const boolStringRule = testRule('BOOL_STRING', ['yes', 'no'], true)
    expect(boolStringRule('never yes no', 0)).toBeFalsy()
  })

})
