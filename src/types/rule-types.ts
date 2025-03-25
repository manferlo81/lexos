import type { CodeProcessingFunction, PotentiallyFalsy } from './helper-types'
import type { MultiTokenRuleResult } from './multi-rule-types'
import type { SingleTokenRuleResult } from './single-rule-types'
import type { TestResult } from './test-types'
import type { TokenType } from './token-types'

export type RuleResult<T extends TokenType, L extends TokenType> = SingleTokenRuleResult<T> | MultiTokenRuleResult<T, L> | TestResult
export type PotentialRuleResult<T extends TokenType, L extends TokenType> = PotentiallyFalsy<RuleResult<T, L>>

export type Rule<T extends TokenType, L extends TokenType> = CodeProcessingFunction<PotentialRuleResult<T, L>>
export type RuleList<T extends TokenType, L extends TokenType> = Array<Rule<T, L>>
export type UnifiableRules<T extends TokenType, L extends TokenType> = Rule<T, L> | RuleList<T, L>
