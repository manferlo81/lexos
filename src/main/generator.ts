import { isType } from '../tools/is'
import { advanceCurrentPos } from '../tools/position-tools'
import { unifyRules } from '../tools/unify-rules'
import type { Falsy, PotentiallyFalsy } from '../types/helper-types'
import type { UnifiableRules } from '../types/rule-types'
import type { LastToken, Token, TokenType } from '../types/token-types'
import type { CreateTokenGenerator } from '../types/types'

export function initTokenGenerator<T extends TokenType = never, L extends TokenType = never>(rules: UnifiableRules<T, L>, lastTokenType?: Falsy): CreateTokenGenerator<T, L>
export function initTokenGenerator<T extends TokenType = never, L extends TokenType = never, X extends TokenType = never>(rules: UnifiableRules<T, L>, lastTokenType: X): CreateTokenGenerator<T, L | X>

export function initTokenGenerator<T extends TokenType = never, L extends TokenType = never>(rules: UnifiableRules<T, L>, lastTokenType: PotentiallyFalsy<L>): CreateTokenGenerator<T, L>
export function initTokenGenerator<T extends TokenType = never, L extends TokenType = never>(rules: UnifiableRules<T, L>, lastTokenType: PotentiallyFalsy<L> = null): CreateTokenGenerator<T, L> {

  const rule = unifyRules(rules)

  return function* (input, offset = 0) {

    // initialize constants & variables
    const inputLength = input.length
    let currentPosition = 0

    Loop: while (currentPosition < inputLength) {

      // compute token position for easy access
      const tokenPosition = currentPosition + offset

      // find first rule that matches
      const result = rule(input, currentPosition)

      // throw if no rule matched
      if (!result) throw new SyntaxError(`Unknown token at position ${tokenPosition}`)

      if (isType(result, 'number')) {

        // advance current position
        currentPosition = advanceCurrentPos(result, currentPosition, inputLength)

        // continue iteration to get next token
        continue Loop
      }

      // advance current position
      currentPosition = advanceCurrentPos(result.length, currentPosition, inputLength)

      // delegate if result is a multi token result
      if ('generator' in result) {

        // delegate to result token generator
        yield* result.generator

        // continue iteration to get next token
        continue Loop
      }

      // yield token if result is a single token result
      if ('token' in result) {
        const { token: { type, value } } = result
        const token: Token<T> = {
          type,
          value,
          pos: tokenPosition,
        }
        yield token
      }

      // continue iteration to get next token
    }

    // yield the last token (if any) after current position reached the end
    if (lastTokenType != null && lastTokenType !== false) {
      const tokenPosition = inputLength + offset
      const token: LastToken<L> = {
        type: lastTokenType,
        pos: tokenPosition,
      }
      yield token
    }

  }

}
