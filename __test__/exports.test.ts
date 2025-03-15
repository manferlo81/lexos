import * as lexos from '../src'

describe('Exports', () => {

  test('should export', () => {
    const expected: Record<keyof typeof lexos, unknown> = {
      createLexer: expect.any(Function),
      createTokenizer: expect.any(Function),
      createOneOf: expect.any(Function),

      regexpTest: expect.any(Function),
      stringTest: expect.any(Function),
      ruleTest: expect.any(Function),
      sequentialTest: expect.any(Function),
      moreOfTest: expect.any(Function),

      testRule: expect.any(Function),
      regexpRule: expect.any(Function),
      stringRule: expect.any(Function),
      lexerRule: expect.any(Function),
    }
    expect(lexos).toEqual(expected)
  })

})
