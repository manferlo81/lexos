import type { AnyRuleResult, TokenRuleResult } from './types/rule-types'
import type { TokenType } from './types/token-types'
import type { TokenizerResult } from './types/types'

interface TypeOfMap {
  string: string
  function: CallableFunction
}

export function isType<K extends keyof TypeOfMap>(value: unknown, type: K): value is TypeOfMap[K]
export function isType(value: unknown, type: string) {
  return typeof value === type
}

type UnknownArray = unknown[] | readonly unknown[]
export const isArray = Array.isArray as (value: unknown) => value is UnknownArray

export function isRuleTokenResult<T extends TokenType>(result: AnyRuleResult<T>): result is TokenRuleResult<T> {
  return 'token' in result
}

export function isTokenizerResult<T extends TokenType>(result: AnyRuleResult<T>): result is TokenizerResult<T> {
  return 'tokens' in result
}
