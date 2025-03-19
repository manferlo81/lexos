import type { Test } from '../../src'
import { singleTokenRule } from '../../src/tools/single-token-rule'
import { expectSingleTokenResult, expectTestResult } from '../tools/expect'

describe('singleTokenRule internal function', () => {

  test('should return rule with type', () => {
    const type = 'TYPE'
    const rule = singleTokenRule(type, (input) => expectTestResult(input))

    const input = 'a + b = c'
    const result = rule(input, 0)
    expect(result).toEqual(expectSingleTokenResult(input, type))
  })

  test('should return rule with dynamic type', () => {
    const testAnyCharacter: Test = (input, pos) => expectTestResult(input[pos])

    const rule = singleTokenRule(
      (char) => {
        if (char === '+') return 'OP'
        if (char === ' ') return 'SP'
        return 'VAR'
      },
      testAnyCharacter,
    )

    const input = 'a + b'
    expect(rule(input, 0)).toEqual(expectSingleTokenResult('a', 'VAR'))
    expect(rule(input, 1)).toEqual(expectSingleTokenResult(' ', 'SP'))
    expect(rule(input, 2)).toEqual(expectSingleTokenResult('+', 'OP'))
    expect(rule(input, 3)).toEqual(expectSingleTokenResult(' ', 'SP'))
    expect(rule(input, 4)).toEqual(expectSingleTokenResult('b', 'VAR'))
  })

  test('should return test if dynamic type returns nullish', () => {
    const testAnyCharacter: Test = (input, pos) => expectTestResult(input[pos])

    const rule = singleTokenRule(
      (char) => {
        if (char === '+') return 'OP'
        if (char === ' ') return null
        return 'VAR'
      },
      testAnyCharacter,
    )

    const input = 'a + b'
    expect(rule(input, 0)).toEqual(expectSingleTokenResult('a', 'VAR'))
    expect(rule(input, 1)).toEqual(expectTestResult(' '))
    expect(rule(input, 2)).toEqual(expectSingleTokenResult('+', 'OP'))
    expect(rule(input, 3)).toEqual(expectTestResult(' '))
    expect(rule(input, 4)).toEqual(expectSingleTokenResult('b', 'VAR'))
  })

})
