import type { CodeProcessingFunction, PotentiallyFalsy } from './helper-types'

export type PotentialLengthTestResult = PotentiallyFalsy<number>

export type LengthTest = CodeProcessingFunction<PotentialLengthTestResult>
