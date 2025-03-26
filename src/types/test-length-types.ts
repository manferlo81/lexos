import type { PotentiallyFalsy } from './helper-types'
import type { RuleBase } from './private-types'

export type PotentialLengthTestResult = PotentiallyFalsy<number>

export type LengthTest = RuleBase<number>
