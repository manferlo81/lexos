import type { CodeProcessingFunction, Lengthy, List, Typed, Valuable } from './helper-types'
import type { Test, TestResult } from './test-types'
import type { TokenType } from './token-types'
import type { TokenizerResult } from './types'

export type LexerRule<T extends TokenType> = CodeProcessingFunction<TokenizerResult<T>>

export interface RuleToken<T extends TokenType> extends Typed<T>, Valuable {}

export interface TokenRuleResult<T extends TokenType> extends Lengthy {
  token: RuleToken<T>
}

export type TokenRule<T extends TokenType> = CodeProcessingFunction<TokenRuleResult<T>>

export type RuleResult<T extends TokenType> = TokenRuleResult<T> | TokenizerResult<T>
export type AnyRuleResult<T extends TokenType> = RuleResult<T> | TestResult

export type Rule<T extends TokenType> = TokenRule<T> | LexerRule<T> | Test
export type RuleList<T extends TokenType = never> = List<Rule<T>>
