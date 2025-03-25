import type { CodeProcessingFunction, FalsyReturn, GetTokenTypeBase, PotentiallyFalsy } from './helper-types'
import type { SingleTokenRule, SingleTokenRuleResult } from './rule-single-types'
import type { ValueTest, ValueTestResult } from './test-value-types'
import type { TokenType } from './token-types'

export type GetActualTokenType<T extends TokenType> = GetTokenTypeBase<T>
export type GetNullishTokenType = GetTokenTypeBase<FalsyReturn>

export type SingleTokenRuleOrTestResult<T extends TokenType> = SingleTokenRuleResult<T> | ValueTestResult
export type SingleTokenRuleOrTest<T extends TokenType> = SingleTokenRule<T> | ValueTest
export type AnySingleTokenRuleOrTest<T extends TokenType> = CodeProcessingFunction<PotentiallyFalsy<SingleTokenRuleOrTestResult<T>>>
