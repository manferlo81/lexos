import type { CodeProcessingFunction, FalsyReturn, Lengthy, Typed, Valued } from './helper-types'
import type { TokenType } from './token-types'

export interface RuleToken<T extends TokenType> extends Typed<T>, Valued {}

export interface SingleTokenRuleResult<T extends TokenType> extends Lengthy {
  token: RuleToken<T>
}

export type PotentialSingleTokenRuleResult<T extends TokenType> = SingleTokenRuleResult<T> | FalsyReturn

export type SingleTokenRule<T extends TokenType> = CodeProcessingFunction<PotentialSingleTokenRuleResult<T>>
