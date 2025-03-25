import type { CodeProcessingFunction, PotentiallyFalsy, WithLength, WithType, WithValue } from './helper-types'
import type { TokenType } from './token-types'

export interface RuleToken<T extends TokenType> extends WithType<T>, WithValue {}

export interface SingleTokenRuleResult<T extends TokenType> extends WithLength {
  token: RuleToken<T>
}

export type PotentialSingleTokenRuleResult<T extends TokenType> = PotentiallyFalsy<SingleTokenRuleResult<T>>

export type SingleTokenRule<T extends TokenType> = CodeProcessingFunction<PotentialSingleTokenRuleResult<T>>
