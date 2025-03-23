import type { TokenGenerator } from '../../src'
import { initTokenGenerator } from '../../src'
import { createGetNextToken } from '../../src/tools/get-next-token'

describe('createGetNextToken internal function', () => {

  test('should create getNextToken function', () => {
    const createTokenGenerator = initTokenGenerator([])
    const generator = createTokenGenerator('')
    const getNextToken = createGetNextToken(generator)
    expect(typeof getNextToken === 'function').toBe(true)
  })

  test('should return tokens from generator', () => {
    const createTokenGeneratorMockUp = function* (): TokenGenerator<'NUM', 'LT'> {
      yield { type: 'NUM', value: '10', pos: 0 }
      yield { type: 'LT', pos: 2 }
    }
    const getNextToken = createGetNextToken(createTokenGeneratorMockUp())
    expect([getNextToken(), getNextToken(), getNextToken()]).toEqual([...createTokenGeneratorMockUp(), null])
  })

})
