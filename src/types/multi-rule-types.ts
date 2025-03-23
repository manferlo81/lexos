import type { CodeProcessingFunction, FalsyReturn, WithLength } from './helper-types'
import type { TokenType } from './token-types'
import type { TokenGenerator } from './types'

export interface MultiTokenRuleResult<T extends TokenType, L extends TokenType> extends WithLength {
  generator: TokenGenerator<T, L>
}

export type PotentialMultiTokenRuleResult<T extends TokenType, L extends TokenType> = MultiTokenRuleResult<T, L> | FalsyReturn

export type MultiTokenRule<T extends TokenType, L extends TokenType> = CodeProcessingFunction<PotentialMultiTokenRuleResult<T, L>>
