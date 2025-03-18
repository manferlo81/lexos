import { repairRegExp } from '../../src/tools/repair-regexp'

describe('repairRegExp internal function', () => {

  test('should always return a new Regexp', () => {
    const regexp = /.*/y
    const repaired = repairRegExp(regexp)
    expect(repaired).not.toBe(regexp)
    expect(repaired).toEqual(regexp)
  })

  test('should remove RegExp start pattern', () => {
    const regexp = /^.*/
    const repaired = repairRegExp(regexp)
    expect(repaired.source).toBe(regexp.source.substring(1))
  })

  test('should keep original flags and add sticky flag', () => {
    const regexps = [
      /.*/,
      /.*/g,
      /.*/i,
      /.*/ig,
      /.*/y,
      /.*/gy,
      /.*/iy,
      /.*/igy,
    ]
    regexps.forEach((regexp) => {
      const repaired = repairRegExp(regexp)
      expect(repaired.global).toBe(regexp.global)
      expect(repaired.ignoreCase).toBe(regexp.ignoreCase)
      expect(repaired.sticky).toBe(true)
    })
  })

})
