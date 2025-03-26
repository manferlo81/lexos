import type { ValueTest } from '../../src'
import { initTokenGenerator, lexerRule, testRule } from '../../src'
import { expectToken } from '../tools/expect'

describe('ValueTest', () => {

  test('should work with generator', () => {
    const test: ValueTest = (input, pos) => {
      const char = input[pos]
      return { length: char.length, value: char }
    }
    const createGenerator = initTokenGenerator(test)
    const regenerate = () => createGenerator('a + b = c')
    expect(() => [...regenerate()]).not.toThrow()
    expect([...regenerate()]).toEqual([])
  })

  test('should serve as test for a rule', () => {
    const test: ValueTest = (input, pos) => {
      const char = input[pos]
      return { length: char.length, value: char }
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

  test('should serve as test for a lexer rule', () => {
    const test: ValueTest = (input) => {
      return { length: input.length, value: input }
    }
    const rule = lexerRule(test, (input, pos) => {
      const char = input[pos]
      if (char === ' ') return { length: 1, value: char }
      return { length: 1, token: { type: 'TYPE', value: char } }
    })
    const createGenerator = initTokenGenerator(rule)
    const generator = createGenerator('a + b = c')
    expect([...generator]).toEqual([
      expectToken('TYPE', 0, 'a'),
      expectToken('TYPE', 2, '+'),
      expectToken('TYPE', 4, 'b'),
      expectToken('TYPE', 6, '='),
      expectToken('TYPE', 8, 'c'),
    ])
  })

})
