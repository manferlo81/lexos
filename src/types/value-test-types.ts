import type { CodeProcessingFunction, FalsyReturn, WithLength, WithValue } from './helper-types'

export interface ValueTestResult extends WithLength, WithValue {}
export type PotentialValueTestResult = ValueTestResult | FalsyReturn

export type ValueTest = CodeProcessingFunction<PotentialValueTestResult>
