import type { CodeProcessingFunction, FalsyReturn } from './helper-types'

export type PotentialLengthTestResult = number | FalsyReturn

export type LengthTest = CodeProcessingFunction<PotentialLengthTestResult>
