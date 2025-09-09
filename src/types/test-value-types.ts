import type { PotentiallyFalsy, RuleBase, WithLength, WithValue } from './helper-types'

export interface ValueTestResult extends WithLength, WithValue<string> {}
export type PotentialValueTestResult = PotentiallyFalsy<ValueTestResult>

export type ValueTest = RuleBase<ValueTestResult>
