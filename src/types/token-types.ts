export type TokenType = string | number

export interface Token<T extends TokenType> {
  type: T
  value: string
  pos: number
}

export type TokenList<T extends TokenType> = Array<Token<T>>
