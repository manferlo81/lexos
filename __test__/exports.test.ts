import * as lexos from '../src'

type ExportName = keyof typeof lexos

describe('exports', () => {

  test('should export createLexer function', () => {
    const expected: Record<ExportName, unknown> = {
      createLexer: expect.any(Function),
      regexpTest: expect.any(Function),
      stringTest: expect.any(Function),
      oneOfTest: expect.any(Function),
      moreOfTest: expect.any(Function),
      sequentialTest: expect.any(Function),
      rule: expect.any(Function),
      regexpRule: expect.any(Function),
      stringRule: expect.any(Function),
      parentRule: expect.any(Function),
    }
    expect(lexos).toEqual(expected)
  })

})
