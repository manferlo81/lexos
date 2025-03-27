import type { FalsyReturn, GetTokenTypeBase, RuleBase } from './helper-types'
import type { MultiTokenRule } from './rule-multi-types'
import type { SingleTokenRule, SingleTokenRuleResult } from './rule-single-types'
import type { LengthTest } from './test-length-types'
import type { Test } from './test-types'
import type { ValueTest, ValueTestResult } from './test-value-types'
import type { TokenType } from './token-types'

export type GetActualTokenType<T extends TokenType> = GetTokenTypeBase<T>
export type GetFalsyTokenType = GetTokenTypeBase<FalsyReturn>

export type SingleTokenRuleOrTestResult<T extends TokenType> = SingleTokenRuleResult<T> | ValueTestResult
export type SingleTokenRuleOrTest<T extends TokenType> = SingleTokenRule<T> | ValueTest
export type AnySingleTokenRuleOrTest<T extends TokenType> = RuleBase<SingleTokenRuleOrTestResult<T>>

export type LengthTestList = LengthTest[]
export type ValueTestList = ValueTest[]
export type TestList = Test[]
export type SingleTokenRuleList<T extends TokenType> = Array<SingleTokenRule<T>>
export type MultiTokenRuleList<T extends TokenType, L extends TokenType> = Array<MultiTokenRule<T, L>>
