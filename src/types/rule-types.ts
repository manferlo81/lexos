import type { FalsyReturn } from './helper-types'
import type { MultiTokenRule, MultiTokenRuleResult } from './multi-rule-types'
import type { SingleTokenRule, SingleTokenRuleResult } from './single-rule-types'
import type { Test, TestResult } from './test-types'
import type { TokenType } from './token-types'

export type RuleResult<T extends TokenType, L extends TokenType> = SingleTokenRuleResult<T> | MultiTokenRuleResult<T, L> | TestResult
export type PotentialRuleResult<T extends TokenType, L extends TokenType> = RuleResult<T, L> | FalsyReturn

export type Rule<T extends TokenType, L extends TokenType> = SingleTokenRule<T> | MultiTokenRule<T, L> | Test
export type RuleList<T extends TokenType, L extends TokenType> = Array<Rule<T, L>>

export type UnifiableRules<T extends TokenType, L extends TokenType> = Rule<T, L> | RuleList<T, L>
