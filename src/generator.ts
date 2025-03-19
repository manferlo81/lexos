import type { MultiTokenRuleResult } from './types/multi-rule-types'
import type { Rule } from './types/rule-types'
import type { TokenType } from './types/token-types'
import type { TokenGenerator } from './types/types'

export function createTokenGenerator<T extends TokenType = never, L extends TokenType = never>(input: string, rule: Rule<T, L>, offset: number, lastTokenType: L | null | undefined): TokenGenerator<T, L>
export function createTokenGenerator<T extends TokenType = never, L extends TokenType = never, X extends TokenType = never>(input: string, rule: Rule<T, L>, offset: number, lastTokenType: X): TokenGenerator<T, L | X>
export function* createTokenGenerator<T extends TokenType = never, L extends TokenType = never>(input: string, rule: Rule<T, L>, offset: number, lastTokenType: L | null | undefined): TokenGenerator<T, L> {
  // set constants
  const inputLength = input.length

  // initialize variables
  let currentPosition = 0
  let triggered: MultiTokenRuleResult<T, L> | null = null

  Loop: while (currentPosition < inputLength) {

    if (triggered) {

      // return token if it produced one
      const { done, value } = triggered.generator.next()

      // if done
      if (done) {
        // advance current position and unregister triggered rule if it's done
        currentPosition += triggered.length
        triggered = null
      } else {
        // yield token
        yield value
      }

      // continue iteration to get next token
      continue Loop
    }

    // compute token position for easy access
    const tokenPosition = currentPosition + offset

    // find first rule that matches
    const result = rule(input, currentPosition)

    // throw if no rule matched
    if (!result) throw new SyntaxError(`Unknown token at position ${tokenPosition}`)

    // register as triggered if result is a multi token result
    // this has to be done before advancing current position
    if ('generator' in result) {
      triggered = result

      // continue iteration to get next token
      continue Loop
    }

    currentPosition += result.length

    // yield token if result is a single token result
    if ('token' in result) {
      const { token: { type, value } } = result
      yield { type, value, pos: tokenPosition }
    }

    // continue iteration to get next token

  }

  // yield the last token (if any) after current position reached the end
  if (lastTokenType != null) {
    const tokenPosition = inputLength + offset
    yield { type: lastTokenType, pos: tokenPosition }
  }

}
