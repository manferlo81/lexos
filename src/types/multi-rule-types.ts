import type { CodeProcessingFunction, FalsyReturn, Lengthy } from './helper-types'
import type { TokenType } from './token-types'
import type { TokenGenerator } from './types'

export interface MultiTokenRuleResult<T extends TokenType, L extends TokenType> extends Lengthy {
  generator: TokenGenerator<T, L>
}

export type PotentialMultiTokenRuleResult<T extends TokenType, L extends TokenType> = MultiTokenRuleResult<T, L> | FalsyReturn

export type MultiTokenRule<T extends TokenType, L extends TokenType> = CodeProcessingFunction<PotentialMultiTokenRuleResult<T, L>>
