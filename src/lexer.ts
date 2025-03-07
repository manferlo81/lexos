import type { Tokenizer, TokenType } from '.'
import { tokenizeCode } from './tokenize'
import type { RuleList } from './types/rule-types'

export function createLexer<T extends TokenType = never>(rules: RuleList<T>): Tokenizer<T> {
  return (code) => {
    return tokenizeCode(rules, code)
  }
}
