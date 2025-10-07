import type { Falsy, RuleBase, WithLength, WithValue } from './helper-types'

export interface ValueTestResult extends WithLength, WithValue<string> {}
export type PotentialValueTestResult = ValueTestResult | Falsy

export type ValueTest = RuleBase<ValueTestResult>
