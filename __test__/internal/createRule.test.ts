import type { TestResult } from '../../src'
import { createRule } from '../../src/tools/create-rule'
import { expectTestResult } from '../tools/expect'

describe('createRule internal function', () => {

  test('should create a function', () => {
    const rule = createRule(() => null, () => null)
    expect (typeof rule === 'function').toBe(true)
  })

  test('should not call callback function if test result is falsy', () => {
    const callback = jest.fn(() => null)
    const rule = createRule(() => null, callback)
    rule('a + b = c', 0)
    expect(callback).not.toHaveBeenCalled()
  })

  test('should call callback function if test returns a valid result', () => {
    const callback = jest.fn(() => null)
    const rule = createRule((input) => ({ value: input, length: input.length }), callback)
    rule('a + b = c', 0)
    expect(callback).toHaveBeenCalled()
  })

  test('should call callback function with test result', () => {
    const callback = jest.fn(() => null)
    const input = 'a + b = c'
    const test = (input: string) => expectTestResult(input)
    const rule = createRule(test, callback)
    rule(input, 0)
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(expectTestResult(input), 0)
  })

  test('should return callback result', () => {
    const callback = jest.fn((result: TestResult) => result)
    const input = 'a + b = c'
    const test = (input: string) => expectTestResult(input)
    const rule = createRule(test, callback)
    const result = rule(input, 0)
    expect(result).toEqual(expectTestResult(input))
  })

})
