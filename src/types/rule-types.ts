import type { Falsy, RuleBase } from './helper-types'
import type { MultiTokenRuleResult } from './rule-multi-types'
import type { SingleTokenRuleResult } from './rule-single-types'
import type { TestResult } from './test-types'
import type { TokenType } from './token-types'

export type RuleResult<T extends TokenType, L extends TokenType> = SingleTokenRuleResult<T> | MultiTokenRuleResult<T, L> | TestResult
export type PotentialRuleResult<T extends TokenType, L extends TokenType> = RuleResult<T, L> | Falsy

export type Rule<T extends TokenType, L extends TokenType> = RuleBase<RuleResult<T, L>>
export type RuleList<T extends TokenType, L extends TokenType> = ReadonlyArray<Rule<T, L>>
export type UnifiableRules<T extends TokenType, L extends TokenType> = Rule<T, L> | RuleList<T, L>
