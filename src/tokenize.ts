import { getFirstTruthyResult } from './first-test'
import { isRuleTokenResult, isTokenizerResult } from './is'
import type { Rule, RuleResult } from './types/rule-types'
import type { Token, TokenList, TokenType } from './types/token-types'
import type { TokenizerResult } from './types/types'

function processRuleResult<T extends TokenType>(result: RuleResult<T>, offsetPosition: number, tokens: TokenList<T>): { length: number, passed: boolean } {

  //
  if (isRuleTokenResult(result)) {
    const { type, value, length } = result
    const token: Token<T> = { type, value, pos: offsetPosition }
    tokens.push(token)
    return { length, passed: true }
  }

  // return length to advance position if result didn't produce any token
  if (!isTokenizerResult(result)) return {
    length: result.length,
    passed: true,
  }

  //
  const { tokens: ruleTokens, done: passed, length } = result

  // offset token positions
  const tokensToAdd = ruleTokens.map(({ type, value, pos }) => ({ type, value, pos: offsetPosition + pos }))

  // add rule tokens to tokens
  tokens.push(...tokensToAdd)

  //
  return { length, passed }

}

export function tokenizeCode<T extends TokenType>(rules: Array<Rule<T>>, code: string): TokenizerResult<T> {
  // initialize variables
  let currentPosition = 0
  const tokens: TokenList<T> = []

  //
  while (currentPosition < code.length) {
    // get result from first rule that applied
    const result = getFirstTruthyResult(rules, code, currentPosition)

    // return failing result if no rule applied
    if (!result) return {
      tokens,
      length: currentPosition,
      done: false,
    }

    const { length: processedLength, passed } = processRuleResult(result, currentPosition, tokens)

    // return failing result if rule didn't process any code
    if (!processedLength) return {
      tokens,
      length: currentPosition,
      done: false,
    }

    // advance current position
    currentPosition += processedLength

    //
    if (!passed) return {
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
