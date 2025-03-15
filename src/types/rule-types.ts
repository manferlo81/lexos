import type { CodeProcessingFunction, FalsyReturn, Lengthy, Typed, Valued } from './internal/helper-types'
import type { Test, TestResult } from './test-types'
import type { TokenType } from './token-types'
import type { GetNextToken } from './types'

export interface RuleToken<T extends TokenType> extends Typed<T>, Valued {}

export interface SingleTokenRuleResult<T extends TokenType> extends Lengthy {
  token: RuleToken<T>
}

export interface MultiTokenRuleResult<T extends TokenType> extends Lengthy {
  getToken: GetNextToken<T>
}

export type SingleTokenRule<T extends TokenType> = CodeProcessingFunction<SingleTokenRuleResult<T> | FalsyReturn>
export type MultiTokenRule<T extends TokenType> = CodeProcessingFunction<MultiTokenRuleResult<T> | FalsyReturn>

export type RuleResult<T extends TokenType> = SingleTokenRuleResult<T> | MultiTokenRuleResult<T> | TestResult

export type Rule<T extends TokenType> = SingleTokenRule<T> | MultiTokenRule<T> | Test
export type RuleList<T extends TokenType> = Array<Rule<T>>
export type UnifiableRules<T extends TokenType> = Rule<T> | RuleList<T>
