import { repairRegExp } from '../tools/repair-regexp'
import type { ValueTest } from '../types/test-value-types'

export function regexpTest(regexp: RegExp): ValueTest {

  const matchingRegExp = repairRegExp(regexp)

  // return test
  return (input, pos) => {

    // test input against RegExp at current position
    matchingRegExp.lastIndex = pos
    const result = matchingRegExp.exec(input)

    // fail if RegExp didn't match
    if (!result) return

    // get value and length
    const value = result[0]
    const valueLength = value.length

    // no need to check for zero length value, as result will always have a length > 0
    // if (valueLength <= 0) return

    // return successful result
    return { value, length: valueLength }

  }
}
