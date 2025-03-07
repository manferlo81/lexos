import { getFirstTruthyResult } from './first-test'
import type { Rule } from './types/rule-types'
import type { Token, TokenType } from './types/token-types'
import type { TokenizerResult } from './types/types'

export function tokenizeCode<T extends TokenType>(rules: Array<Rule<T>>, code: string): TokenizerResult<T> {
  // initialize variables
  let currentPosition = 0
  const tokens: Array<Token<T>> = []

  //
  Loop: while (currentPosition < code.length) {
    // get result from first rule that applied
    const result = getFirstTruthyResult(rules, code, currentPosition)

    // return failing result if no rule applied or rule didn't process any code
    if (!result?.length) return {
      tokens,
      length: currentPosition,
      done: false,
    }

    // save current position to offset tokens
    const tokenOffsetPosition = currentPosition

    // advance current position
    const { length: processedLength } = result
    currentPosition += processedLength

    // advance current position if result didn't produce any token
    if (!('tokens' in result)) {
      continue Loop
    }

    //
    const { tokens: ruleTokens, done } = result

    // offset token positions
    const tokensToAdd = ruleTokens.map(({ pos, ...rest }) => ({ ...rest, pos: tokenOffsetPosition + pos }))

    // add rule tokens to tokens
    tokens.push(...tokensToAdd)

    if (!done) return {
      tokens,
      length: currentPosition,
      done: false,
    }
  }

  // finally
  return {
    tokens,
    length: currentPosition,
    done: true,
  }
}
