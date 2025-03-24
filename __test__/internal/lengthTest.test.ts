import { lengthTest } from '../../src/tools/length-test'
import { createTestResult } from '../tools/create'

describe('lengthTest internal function', () => {

  test('should return result if length is greater than 0', () => {
    const test = lengthTest(() => 5)
    expect(test('a + b = c + d', 0)).toEqual(createTestResult('a + b'))
  })

  test('should return falsy if length is falsy', () => {
    const test = lengthTest(() => null)
    expect(test('a + b = c + d', 0)).toBeFalsy()
  })

  test('should return falsy if length is zero', () => {
    const test = lengthTest(() => 0)
    expect(test('a + b = c + d', 0)).toBeFalsy()
  })

  test('should return falsy if length is less than zero', () => {
    const test = lengthTest(() => -3)
    expect(test('a + b = c + d', 0)).toBeFalsy()
  })

})
