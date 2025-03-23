import type { Rule, Test } from '../../src'

export function neverMatchTest(): Test {
  return () => null
}

export function wholeInputRule(): Rule<'INPUT', never> {
  return (input) => {
    return {
      length: input.length,
      token: {
        type: 'INPUT',
        value: input,
      },
    }
  }
}
