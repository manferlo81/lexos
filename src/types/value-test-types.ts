import type { CodeProcessingFunction, PotentiallyFalsy, WithLength, WithValue } from './helper-types'

export interface ValueTestResult extends WithLength, WithValue {}
export type PotentialValueTestResult = PotentiallyFalsy<ValueTestResult>

export type ValueTest = CodeProcessingFunction<PotentialValueTestResult>
