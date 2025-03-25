import type { CodeProcessingFunction, FalsyReturn, GetTokenTypeBase, PotentiallyFalsy } from './helper-types'
import type { SingleTokenRule, SingleTokenRuleResult } from './single-rule-types'
import type { TokenType } from './token-types'
import type { ValueTest, ValueTestResult } from './value-test-types'

export type GetActualTokenType<T extends TokenType> = GetTokenTypeBase<T>
export type GetNullishTokenType = GetTokenTypeBase<FalsyReturn>

export type SingleTokenRuleOrTestResult<T extends TokenType> = SingleTokenRuleResult<T> | ValueTestResult
export type SingleTokenRuleOrTest<T extends TokenType> = SingleTokenRule<T> | ValueTest
export type AnySingleTokenRuleOrTest<T extends TokenType> = CodeProcessingFunction<PotentiallyFalsy<SingleTokenRuleOrTestResult<T>>>
