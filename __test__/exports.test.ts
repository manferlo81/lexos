import * as lexos from '../src'
import { expectFunction } from './tools/expect'

describe('Exports', () => {

  test('should export', () => {
    expect(lexos).toEqual<Record<keyof typeof lexos, unknown>>({
      initTokenGenerator: expectFunction(),
      createOneOf: expectFunction(),

      regexpTest: expectFunction(),
      stringTest: expectFunction(),
      ruleTest: expectFunction(),
      sequentialTest: expectFunction(),
      moreOfTest: expectFunction(),

      testRule: expectFunction(),
      regexpRule: expectFunction(),
      stringRule: expectFunction(),
      lexerRule: expectFunction(),
    })
  })

})
