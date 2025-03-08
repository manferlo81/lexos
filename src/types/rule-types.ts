import type { FalsyReturn } from './helper-types'
import type { Test } from './test-types'
import type { TokenType } from './token-types'
import type { TokenizerResult } from './types'

// interface RuleToken<T extends TokenType> {
//   type: T
//   value: string
//   length: number
// }

// interface TokenizeResult__<T extends TokenType> {
//   length: number
//   results: Array<RuleToken<T>>
//   done: boolean
// }

export type TokenRule<T extends TokenType> = (code: string, currentPosition: number) => TokenizerResult<T> | FalsyReturn

export type Rule<T extends TokenType> = TokenRule<T> | Test
export type RuleList<T extends TokenType> = Array<Rule<T>>
