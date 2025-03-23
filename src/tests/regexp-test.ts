import { repairRegExp } from '../tools/repair-regexp'
import type { Test } from '../types/test-types'

export function regexpTest(regexp: RegExp): Test {

  const matchingRegExp = repairRegExp(regexp)

  // return test
  return (input, pos) => {

    // test input against RegExp at current position
    matchingRegExp.lastIndex = pos
    const result = matchingRegExp.exec(input)

    // fail if RegExp didn't match
    if (!result) return

    // return successful result if it's not a zero length value
    const value = result[0]
    const length = value.length
    if (length > 0) return { value, length }

    // fail otherwise
  }
}
