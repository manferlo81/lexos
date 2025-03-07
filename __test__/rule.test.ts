import { rule, stringTest } from '../src'

describe('rule function', () => {

  test('should be a function', () => {
    const text = rule(stringTest('text'), 'Text')
    expect(typeof text === 'function').toBe(true)
  })

})
