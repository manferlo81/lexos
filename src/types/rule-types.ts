import type { CodeProcessingFunction } from './helper-types'
import type { TestResult } from './test-types'
import type { TokenType } from './token-types'
import type { TokenizerResult } from './types'

export interface TokenRuleResult<T extends TokenType> {
  type: T
  value: string
  length: number
}

export type TokenRule<T extends TokenType> = CodeProcessingFunction<TokenRuleResult<T>>
export type LexerRule<T extends TokenType> = CodeProcessingFunction<TokenizerResult<T>>

export type RuleResult<T extends TokenType> = TokenRuleResult<T> | TokenizerResult<T>
export type RuleOrTestResult<T extends TokenType> = RuleResult<T> | TestResult

export type Rule<T extends TokenType> = CodeProcessingFunction<RuleOrTestResult<T>>
export type RuleList<T extends TokenType> = Array<Rule<T>>
