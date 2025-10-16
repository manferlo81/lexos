import type { Falsy, RuleBase, WithLength, WithType, WithValue } from './helper-types'
import type { TokenType } from './token-types'

export interface RuleToken<T extends TokenType, V extends string = string> extends WithType<T>, WithValue<V> {}

export interface SingleTokenRuleResult<T extends TokenType, V extends string = string> extends WithLength {
  token: RuleToken<T, V>
}

export type PotentialSingleTokenRuleResult<T extends TokenType, V extends string = string> = SingleTokenRuleResult<T, V> | Falsy

export type SingleTokenRule<T extends TokenType, V extends string = string> = RuleBase<SingleTokenRuleResult<T, V>>
