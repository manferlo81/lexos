import type { RuleResult } from '../types/rule-types'
import type { TokenType } from '../types/token-types'
import { isType } from './is'

export function getLengthFromResult(result: RuleResult<TokenType, TokenType>): number {
  if (isType(result, 'number')) return result
  return result.length
}
