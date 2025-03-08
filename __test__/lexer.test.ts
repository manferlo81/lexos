import { createLexer, oneOfTest, regexpRule, regexpTest, rule, stringTest } from '../src'

describe('createLexer function', () => {

  test('', () => {
    const tokenize = createLexer([
      regexpTest(/[^\S]+/),
      regexpRule(/[0-9]+/, 'Int'),
      regexpRule(/[a-z]+/i, 'Var'),
      rule(
        oneOfTest([
          stringTest('+'),
          stringTest('-'),
          stringTest('*'),
          stringTest('/'),
          stringTest('='),
        ]),
        'Op',
      ),
      rule(
        oneOfTest([
          stringTest('('),
          stringTest(')'),
        ]),
        'Gr',
      ),
    ])
    const input = '  y = 2 + 3 * (x + 1)'
    const result = tokenize(input)
    expect(result).toEqual({
      done: true,
      length: input.length,
      tokens: expect.any(Array) as never,
    })
    const { tokens } = result
    expect(tokens).toEqual([
      { type: 'Var', value: 'y', pos: 2 },
      { type: 'Op', value: '=', pos: 4 },
      { type: 'Int', value: '2', pos: 6 },
      { type: 'Op', value: '+', pos: 8 },
      { type: 'Int', value: '3', pos: 10 },
      { type: 'Op', value: '*', pos: 12 },
      { type: 'Gr', value: '(', pos: 14 },
      { type: 'Var', value: 'x', pos: 15 },
      { type: 'Op', value: '+', pos: 17 },
      { type: 'Int', value: '1', pos: 19 },
      { type: 'Gr', value: ')', pos: 20 },
    ])
  })

})
