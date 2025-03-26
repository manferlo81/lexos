import type { PotentiallyFalsy, WithLength, WithValue } from './helper-types'
import type { RuleBase } from './private-types'

export interface ValueTestResult extends WithLength, WithValue {}
export type PotentialValueTestResult = PotentiallyFalsy<ValueTestResult>

export type ValueTest = RuleBase<ValueTestResult>
