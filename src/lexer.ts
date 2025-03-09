import { tokenizeCode } from './tokenize'
import type { RuleList } from './types/rule-types'
import type { TestList } from './types/test-types'
import type { TokenType } from './types/token-types'
import type { Tokenizer } from './types/types'

export function createLexer(rules: TestList): Tokenizer<never>
export function createLexer<T extends TokenType = never>(rules: RuleList<T>): Tokenizer<T>
export function createLexer<T extends TokenType = never>(rules: RuleList<T>): Tokenizer<T> {
  return (code) => {
    return tokenizeCode(rules, code)
  }
}
