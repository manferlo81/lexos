import type { LengthTest, Test } from '../types/test-types'

export function lengthTest(getLength: LengthTest): Test {
  // return test
  return (input, pos) => {

    // get processed length
    const length = getLength(input, pos)

    // return successful result if some of the input was processed...
    if (length && length > 0) {
      const value = input.slice(pos, pos + length)
      return { value, length }
    }

    // fail otherwise
  }
}
