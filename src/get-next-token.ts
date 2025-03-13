import type { MultiTokenRuleResult, Rule } from './types/rule-types'
import type { TokenType } from './types/token-types'
import type { GetNextToken } from './types/types'

export function createGetNextToken<T extends TokenType>(input: string, unifiedRule: Rule<T>, offset: number, lastToken: null): GetNextToken<T> {
  // initialize
  const inputLength = input.length

  let currentPosition = 0
  let triggered: MultiTokenRuleResult<T> | null = null

  const getNextToken: GetNextToken<T> = () => {

    // get token from multi token result if triggered
    if (triggered) {

      // return token if it produced one
      const token = triggered.getToken()
      if (token) return token

      // advance current position and unregister triggered rule if it's done
      currentPosition += triggered.length
      triggered = null

      // return next token
      return getNextToken()
    }

    // return null if the end of input has been reached
    if (currentPosition >= inputLength) return lastToken

    // find first rule that matches
    const result = unifiedRule(input, currentPosition)

    // throw if no rule matched
    if (!result) throw new SyntaxError(`Unknown token at position ${currentPosition + offset}`)

    // register as triggered if result is a multi token result
    // this has to be done before advancing current position
    if ('getToken' in result) {
      triggered = result

      // return next token
      return getNextToken()
    }

    // get result length
    const length = result.length

    // save current position for later use
    const tokenOffset = currentPosition

    // advance current position
    currentPosition += length

    // return token if result is a single token result
    if ('token' in result) {
      const { token: { type, value } } = result
      return { type, value, pos: tokenOffset + offset }
    }

    // return next token if rule didn't produce a token
    return getNextToken()
  }

  // return get next token function
  return getNextToken
}
