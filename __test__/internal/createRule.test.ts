import type { LengthTest, ValueTest, ValueTestResult } from '../../src'
import { createRule } from '../../src/tools/create-rule'
import { createTestResult } from '../tools/create'
import { expectTestResult } from '../tools/expect'
import { neverMatchTest } from '../tools/rules'

describe('createRule internal function', () => {

  test('should create a function', () => {
    const rule = createRule(neverMatchTest(), () => null)
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
    const test: ValueTest = (input) => createTestResult(input)
    const rule = createRule(test, callback)
    rule('a + b = c', 0)
    expect(callback).toHaveBeenCalled()
  })

  test('should call callback function if test returns a non-zero number', () => {
    const callback = jest.fn(() => null)
    const test: LengthTest = () => 5
    const rule = createRule(test, callback)
    rule('a + b = c', 0)
    expect(callback).toHaveBeenCalled()
  })

  test('should call callback function with test result', () => {
    const callback = jest.fn(() => null)
    const input = 'a + b = c'
    const test: ValueTest = (input) => createTestResult(input.slice(0, 5))
    const rule = createRule(test, callback)
    rule(input, 0)
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(expectTestResult(input.slice(0, 5)), 0)
  })

  test('should call callback function with test result from length', () => {
    const callback = jest.fn(() => null)

    const inputStart = 'a + b'
    const input = `${inputStart} = c`

    const inputStartLength = inputStart.length

    const test: LengthTest = () => inputStartLength
    const rule = createRule(test, callback)

    rule(input, 0)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(expectTestResult(input.slice(0, inputStartLength)), 0)
  })

  test('should return callback result, using value test', () => {
    const callback = jest.fn((result: ValueTestResult) => result)
    const input = 'a + b = c'
    const test = (input: string) => createTestResult(input.slice(0, 5))
    const rule = createRule(test, callback)
    const result = rule(input, 0)
    expect(result).toEqual(expectTestResult(input.slice(0, 5)))
  })

  test('should return callback result, using length test', () => {
    const callback = jest.fn((result: ValueTestResult) => result)
    const input = 'a + b = c'
    const test = () => 5
    const rule = createRule(test, callback)
    const result = rule(input, 0)
    expect(result).toEqual(expectTestResult(input.slice(0, 5)))
  })

})
