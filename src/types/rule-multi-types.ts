import type { PotentiallyFalsy, RuleBase, WithLength } from './helper-types'
import type { TokenType } from './token-types'
import type { TokenGenerator, TokenGeneratorNoLastToken } from './types'

export interface MultiTokenRuleResult<T extends TokenType, L extends TokenType> extends WithLength {
  generator: TokenGenerator<T, L>
}

export interface MultiTokenRuleResultNoLastToken<T extends TokenType> extends WithLength {
  generator: TokenGeneratorNoLastToken<T>
}

export type PotentialMultiTokenRuleResult<T extends TokenType, L extends TokenType> = PotentiallyFalsy<MultiTokenRuleResult<T, L>>

export type MultiTokenRule<T extends TokenType, L extends TokenType> = RuleBase<MultiTokenRuleResult<T, L>>
export type MultiTokenRuleNoLastToken<T extends TokenType> = RuleBase<MultiTokenRuleResultNoLastToken<T>>
