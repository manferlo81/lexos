import { isType } from './tools/is'
import { validateLength } from './tools/length-tools'
import { unifyRules } from './tools/unify-rules'
import type { Falsy, PotentiallyFalsy } from './types/helper-types'
import type { MultiTokenRuleResult } from './types/rule-multi-types'
import type { UnifiableRules } from './types/rule-types'
import type { TokenType } from './types/token-types'
import type { CreateTokenGenerator } from './types/types'

export function initTokenGenerator<T extends TokenType = never, L extends TokenType = never>(rules: UnifiableRules<T, L>, lastTokenType?: Falsy): CreateTokenGenerator<T, L>
export function initTokenGenerator<T extends TokenType = never, L extends TokenType = never, X extends TokenType = never>(rules: UnifiableRules<T, L>, lastTokenType: X): CreateTokenGenerator<T, L | X>

export function initTokenGenerator<T extends TokenType = never, L extends TokenType = never>(rules: UnifiableRules<T, L>, lastTokenType: PotentiallyFalsy<L>): CreateTokenGenerator<T, L>
export function initTokenGenerator<T extends TokenType = never, L extends TokenType = never>(rules: UnifiableRules<T, L>, lastTokenType: PotentiallyFalsy<L> = null): CreateTokenGenerator<T, L> {

  const rule = unifyRules(rules)

  return function* (input, offset = 0) {

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

      if (isType(result, 'number')) {

        // advance current position
        currentPosition += validateLength(result, currentPosition, inputLength)

        // continue iteration to get next token
        continue Loop
      }

      // register as triggered if result is a multi token result
      // this has to be done before advancing current position
      if ('generator' in result) {

        // register result
        triggered = {
          length: validateLength(result.length, currentPosition, inputLength),
          generator: result.generator,
        }

        // continue iteration to get next token
        continue Loop
      }

      // advance current position
      currentPosition += validateLength(result.length, currentPosition, inputLength)

      // yield token if result is a single token result
      if ('token' in result) {
        const { token: { type, value } } = result
        yield { type, value, pos: tokenPosition }
      }

      // continue iteration to get next token
    }

    // yield the last token (if any) after current position reached the end
    if (lastTokenType != null && lastTokenType !== false) {
      const tokenPosition = inputLength + offset
      yield { type: lastTokenType, pos: tokenPosition }
    }

  }

}
