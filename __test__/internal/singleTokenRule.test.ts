import type { Test } from '../../src'
import { singleTokenRule } from '../../src/tools/single-token-rule'
import { expectedTestResult, expectedTokenResult } from '../tools/create-result'

describe('singleTokenRule internal function', () => {

  test('should return rule with type', () => {
    const type = 'TYPE'
    const rule = singleTokenRule(type, (input) => expectedTestResult(input))

    const input = 'a + b = c'
    const result = rule(input, 0)
    expect(result).toEqual(expectedTokenResult(input, type))
  })

  test('should return rule with dynamic type', () => {
    const testAnyCharacter: Test = (input, pos) => expectedTestResult(input[pos])

    const rule = singleTokenRule(
      (char) => {
        if (char === '+') return 'OP'
        if (char === ' ') return 'SP'
        return 'VAR'
      },
      testAnyCharacter,
    )

    const input = 'a + b'
    expect(rule(input, 0)).toEqual(expectedTokenResult('a', 'VAR'))
    expect(rule(input, 1)).toEqual(expectedTokenResult(' ', 'SP'))
    expect(rule(input, 2)).toEqual(expectedTokenResult('+', 'OP'))
    expect(rule(input, 3)).toEqual(expectedTokenResult(' ', 'SP'))
    expect(rule(input, 4)).toEqual(expectedTokenResult('b', 'VAR'))
  })

  test('should return test if dynamic type returns nullish', () => {
    const testAnyCharacter: Test = (input, pos) => expectedTestResult(input[pos])

    const rule = singleTokenRule(
      (char) => {
        if (char === '+') return 'OP'
        if (char === ' ') return null
        return 'VAR'
      },
      testAnyCharacter,
    )

    const input = 'a + b'
    expect(rule(input, 0)).toEqual(expectedTokenResult('a', 'VAR'))
    expect(rule(input, 1)).toEqual(expectedTestResult(' '))
    expect(rule(input, 2)).toEqual(expectedTokenResult('+', 'OP'))
    expect(rule(input, 3)).toEqual(expectedTestResult(' '))
    expect(rule(input, 4)).toEqual(expectedTokenResult('b', 'VAR'))
  })

})
