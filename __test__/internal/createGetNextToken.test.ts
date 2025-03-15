import { createOneOf, lexerRule, regexpTest, stringRule } from '../../src'
import { createGetNextToken } from '../../src/tools/get-next-token'

describe('createGetNextToken internal function', () => {

  test('should create a function', () => {
    const getNextToken = createGetNextToken(
      'a + b = c',
      createOneOf([
        regexpTest(/\s+/),
        stringRule(['a', 'b', 'c'], 'VAR'),
        stringRule(['+', '='], 'OP'),
      ]),
      0,
      null,
    )
    expect(typeof getNextToken === 'function').toBe(true)
  })

  test('should throw on unknown token', () => {
    const variableType = 'VAR'
    const operatorType = 'OP'
    const getNextToken = createGetNextToken(
      'a + z = c',
      createOneOf([
        regexpTest(/\s+/),
        stringRule(['a', 'b', 'c'], variableType),
        stringRule(['+', '='], operatorType),
      ]),
      0,
      null,
    )
    expect(getNextToken()).toEqual({ type: variableType, value: 'a', pos: 0 })
    expect(getNextToken()).toEqual({ type: operatorType, value: '+', pos: 2 })
    expect(getNextToken).toThrow('position 4')
  })

  test('should throw from lexer rule', () => {
    const variableType = 'VAR'
    const keywordType = 'KW'
    const curlyType = 'CURLY'
    const getNextToken = createGetNextToken(
      ' evaluate { a + b - c }',
      createOneOf([
        regexpTest(/\s+/),
        stringRule('evaluate', keywordType),
        lexerRule(/{.*}/, [
          regexpTest(/\s+/),
          stringRule(['{', '}'], curlyType),
          stringRule(['a', 'b', 'c'], variableType),
        ]),
      ]),
      0,
      null,
    )
    expect(getNextToken()).toEqual({ type: keywordType, value: 'evaluate', pos: 1 })
    expect(getNextToken()).toEqual({ type: curlyType, value: '{', pos: 10 })
    expect(getNextToken()).toEqual({ type: variableType, value: 'a', pos: 12 })
    expect(getNextToken).toThrow('position 14')
  })

  test('should return null after last token', () => {
    const variableType = 'VAR'
    const operatorType = 'OP'
    const getNextToken = createGetNextToken(
      'a + b = c',
      createOneOf([
        regexpTest(/\s+/),
        stringRule(['a', 'b', 'c'], variableType),
        stringRule(['+', '='], operatorType),
      ]),
      0,
      'LT',
    )
    expect(getNextToken()).toEqual({ type: variableType, value: 'a', pos: 0 })
    expect(getNextToken()).toEqual({ type: operatorType, value: '+', pos: 2 })
    expect(getNextToken()).toEqual({ type: variableType, value: 'b', pos: 4 })
    expect(getNextToken()).toEqual({ type: operatorType, value: '=', pos: 6 })
    expect(getNextToken()).toEqual({ type: variableType, value: 'c', pos: 8 })
    expect(getNextToken()).toBe('LT')
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
  })

  test('should get tokens one by one', () => {
    const variableType = 'VAR'
    const operatorType = 'OP'
    const getNextToken = createGetNextToken(
      'a + b = c',
      createOneOf([
        regexpTest(/\s+/),
        stringRule(['a', 'b', 'c'], variableType),
        stringRule(['+', '='], operatorType),
      ]),
      0,
      null,
    )
    expect(getNextToken()).toEqual({ type: variableType, value: 'a', pos: 0 })
    expect(getNextToken()).toEqual({ type: operatorType, value: '+', pos: 2 })
    expect(getNextToken()).toEqual({ type: variableType, value: 'b', pos: 4 })
    expect(getNextToken()).toEqual({ type: operatorType, value: '=', pos: 6 })
    expect(getNextToken()).toEqual({ type: variableType, value: 'c', pos: 8 })
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
  })

  test('should get tokens one by one, using lexer rule', () => {
    const variableType = 'VAR'
    const operatorType = 'OP'
    const curlyType = 'CURLY'
    const keywordType = 'KW'
    const getNextToken = createGetNextToken(
      ' evaluate { a + b - c }',
      createOneOf([
        regexpTest(/\s+/),
        stringRule('evaluate', keywordType),
        lexerRule(/{.*}/, [
          regexpTest(/\s+/),
          stringRule(['{', '}'], curlyType),
          stringRule(['a', 'b', 'c'], variableType),
          stringRule(['+', '-'], operatorType),
        ]),
      ]),
      0,
      null,
    )
    expect(getNextToken()).toEqual({ type: keywordType, value: 'evaluate', pos: 1 })
    expect(getNextToken()).toEqual({ type: curlyType, value: '{', pos: 10 })
    expect(getNextToken()).toEqual({ type: variableType, value: 'a', pos: 12 })
    expect(getNextToken()).toEqual({ type: operatorType, value: '+', pos: 14 })
    expect(getNextToken()).toEqual({ type: variableType, value: 'b', pos: 16 })
    expect(getNextToken()).toEqual({ type: operatorType, value: '-', pos: 18 })
    expect(getNextToken()).toEqual({ type: variableType, value: 'c', pos: 20 })
    expect(getNextToken()).toEqual({ type: curlyType, value: '}', pos: 22 })
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
  })

  test('should get back to position after lexer rule is done', () => {
    const variableType = 'VAR'
    const operatorType = 'OP'
    const curlyType = 'CURLY'
    const keywordType = 'KW'
    const getNextToken = createGetNextToken(
      ' evaluate { a + b - c } evaluate { c }',
      createOneOf([
        regexpTest(/\s+/),
        stringRule('evaluate', keywordType),
        lexerRule(/{[^}]*}/, [
          regexpTest(/\s+/),
          stringRule(['{', '}'], curlyType),
          stringRule(['a', 'b', 'c'], variableType),
          stringRule(['+', '-'], operatorType),
        ]),
      ]),
      0,
      null,
    )
    expect(getNextToken()).toEqual({ type: keywordType, value: 'evaluate', pos: 1 })
    expect(getNextToken()).toEqual({ type: curlyType, value: '{', pos: 10 })
    expect(getNextToken()).toEqual({ type: variableType, value: 'a', pos: 12 })
    expect(getNextToken()).toEqual({ type: operatorType, value: '+', pos: 14 })
    expect(getNextToken()).toEqual({ type: variableType, value: 'b', pos: 16 })
    expect(getNextToken()).toEqual({ type: operatorType, value: '-', pos: 18 })
    expect(getNextToken()).toEqual({ type: variableType, value: 'c', pos: 20 })
    expect(getNextToken()).toEqual({ type: curlyType, value: '}', pos: 22 })
    expect(getNextToken()).toEqual({ type: keywordType, value: 'evaluate', pos: 24 })
    expect(getNextToken()).toEqual({ type: curlyType, value: '{', pos: 33 })
    expect(getNextToken()).toEqual({ type: variableType, value: 'c', pos: 35 })
    expect(getNextToken()).toEqual({ type: curlyType, value: '}', pos: 37 })
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
    expect(getNextToken()).toBeNull()
  })

})
