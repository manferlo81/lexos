import * as lexos from '../src'
import { expectFunction } from './tools/expect'

describe('Exports', () => {

  test('should export', () => {
    expect(lexos).toEqual<Record<keyof typeof lexos, unknown>>({
      initTokenGenerator: expectFunction(),
      oneOf: expectFunction(),
      createOneOf: expectFunction(),

      oneOfTest: expectFunction(),
      regexpTest: expectFunction(),
      stringTest: expectFunction(),
      ruleTest: expectFunction(),
      sequentialTest: expectFunction(),
      moreOfTest: expectFunction(),

      oneOfRule: expectFunction(),
      testRule: expectFunction(),
      regexpRule: expectFunction(),
      stringRule: expectFunction(),
      lexerRule: expectFunction(),
    })
  })

})
