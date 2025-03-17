import { repairRegExp } from '../../src/tools/repair-regexp'

describe('repairRegExp function', () => {

  test('should return input RegExp if it matches start', () => {
    const regexp = /^.*/
    const repaired = repairRegExp(regexp)
    expect(repaired).toBe(regexp)
  })

  test('should return a new RegExp matching start', () => {
    const regexp = /.*/
    const repaired = repairRegExp(regexp)
    expect(repaired).not.toBe(regexp)
    expect(repaired.source.startsWith('^')).toBe(true)
  })

  test('should keep original flags', () => {
    const regexps = [
      /.*/,
      /^.*/,
      /.*/i,
      /^.*/i,
    ]
    regexps.forEach((regexp) => {
      const repaired = repairRegExp(regexp)
      expect(repaired.flags).toEqual(regexp.flags)
    })
  })

})
