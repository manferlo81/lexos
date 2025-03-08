import type { FalsyReturn } from './helper-types'
import type { Test, TestResult } from './test-types'
import type { TokenType } from './token-types'
import type { TokenizerResult } from './types'

export interface RuleTokenResult<T extends TokenType> {
  type: T
  value: string
  length: number
}

export type TokenRule<T extends TokenType> = (code: string, currentPosition: number) => RuleTokenResult<T> | FalsyReturn
export type LexerRule<T extends TokenType> = (code: string, currentPosition: number) => TokenizerResult<T> | FalsyReturn

export type RuleResult<T extends TokenType> = RuleTokenResult<T> | TokenizerResult<T> | TestResult
export type Rule<T extends TokenType> = LexerRule<T> | TokenRule<T> | Test

export type RuleList<T extends TokenType> = Array<Rule<T>>
