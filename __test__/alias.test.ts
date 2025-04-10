import { createOneOf, oneOf, oneOfRule, oneOfTest } from '../src'

describe('Aliases', () => {

  test('should export oneOf function aliases', () => {
    expect(oneOfRule).toBe(oneOf)
    expect(oneOfTest).toBe(oneOf)
    expect(createOneOf).toBe(oneOf)
  })

})
