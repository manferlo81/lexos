import type { MultiTokenRuleResult } from './types/multi-rule-types'
import type { Rule } from './types/rule-types'
import type { TokenType } from './types/token-types'
import type { GetNextToken, TokenGenerator } from './types/types'

export function createTokenGenerator<T extends TokenType = never, L extends TokenType = never>(input: string, rule: Rule<T, L>, offset: number, lastTokenType: L | null | undefined): TokenGenerator<T, L>
export function createTokenGenerator<T extends TokenType = never, L extends TokenType = never, X extends TokenType = never>(input: string, rule: Rule<T, L>, offset: number, lastTokenType: X): TokenGenerator<T, L | X>
export function* createTokenGenerator<T extends TokenType = never, L extends TokenType = never>(input: string, rule: Rule<T, L>, offset: number, lastTokenType: L | null | undefined): TokenGenerator<T, L> {
  // set constants
  const inputLength = input.length

  // initialize variables
  let currentPosition = 0
  let lastTokenEmitted = false
  let triggered: MultiTokenRuleResult<T, L> | null = null

  const getNextToken: GetNextToken<T, L> = () => {

    // get token from multi token result if triggered
    if (triggered) {

      // return token if it produced one
      const triggeredResult = triggered.generator.next()
      if (!triggeredResult.done) return triggeredResult.value

      // advance current position and unregister triggered rule if it's done
      currentPosition += triggered.length
      triggered = null

      // return next token
      return getNextToken()
    }

    // compute token position for easy access
    const tokenPosition = currentPosition + offset

    // return null if the end of input has been reached
    if (currentPosition >= inputLength) {
      if (lastTokenEmitted) return null
      lastTokenEmitted = true
      if (lastTokenType == null) return null
      return { type: lastTokenType, pos: tokenPosition }
    }

    // find first rule that matches
    const result = rule(input, currentPosition)

    // throw if no rule matched
    if (!result) throw new SyntaxError(`Unknown token at position ${tokenPosition}`)

    // register as triggered if result is a multi token result
    // this has to be done before advancing current position
    if ('generator' in result) {
      triggered = result

      // return next token
      return getNextToken()
    }

    // get result length
    const length = result.length

    // advance current position
    currentPosition += length

    // return token if result is a single token result
    if ('token' in result) {
      const { token: { type, value } } = result
      return { type, value, pos: tokenPosition }
    }

    // return next token if rule didn't produce a token
    return getNextToken()
  }

  for (let token = getNextToken(); token; token = getNextToken()) {
    yield token
  }

}
