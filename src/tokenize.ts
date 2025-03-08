import { getFirstTruthyResult } from './first-test'
import { isRuleTokenResult, isTokenizerResult } from './is'
import type { Rule, RuleOrTestResult } from './types/rule-types'
import type { Token, TokenList, TokenType } from './types/token-types'
import type { TokenizerResult } from './types/types'

function processRuleResult<T extends TokenType>(result: RuleOrTestResult<T>, offsetPosition: number, tokens: TokenList<T>): { length: number, passed: boolean } {

  // if it's a token rule
  if (isRuleTokenResult(result)) {
    const { type, value, length } = result
    const token: Token<T> = { type, value, pos: offsetPosition }
    tokens.push(token)
    return { length, passed: true }
  }

  // return length to advance position if result didn't produce any token
  if (!isTokenizerResult(result)) {
    const { length } = result
    return { length, passed: true }
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
  const codeLength = code.length
  const tokens: TokenList<T> = []

  //
  let currentPosition = 0

  //
  while (currentPosition < codeLength) {
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

    // exit if lexer rule didn't process the whole input
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
