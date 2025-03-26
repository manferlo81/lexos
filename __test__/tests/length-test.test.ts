import type { LengthTest } from '../../src'
import { initTokenGenerator, testRule } from '../../src'
import { expectToken } from '../tools/expect'

describe('LengthTest', () => {

  test('should work with generator', () => {
    const test: LengthTest = () => {
      return 1
    }
    const createGenerator = initTokenGenerator(test)
    const regenerate = () => createGenerator('a + b = c')
    expect(() => [...regenerate()]).not.toThrow()
    expect([...regenerate()]).toEqual([])
  })

  test('should serve as test for a rule', () => {
    const test: LengthTest = () => {
      return 1
    }
    const rule = testRule('TYPE', test)
    const createGenerator = initTokenGenerator(rule)
    const generator = createGenerator('a + b = c')
    expect([...generator]).toEqual([
      expectToken('TYPE', 0, 'a'),
      expectToken('TYPE', 1, ' '),
      expectToken('TYPE', 2, '+'),
      expectToken('TYPE', 3, ' '),
      expectToken('TYPE', 4, 'b'),
      expectToken('TYPE', 5, ' '),
      expectToken('TYPE', 6, '='),
      expectToken('TYPE', 7, ' '),
      expectToken('TYPE', 8, 'c'),
    ])
  })

})
