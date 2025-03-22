import { mapItemsWithArgs } from '../../src/tools/map-items'

describe('mapItemsWithArgs internal function', () => {

  test('should return array', () => {
    const transformItem = () => null
    const mapped = mapItemsWithArgs([], transformItem)
    expect(Array.isArray(mapped)).toBe(true)
  })

  test('should return mapped array', () => {
    const transformItem = (item: number | string) => {
      if (typeof item === 'number') return item + 1
      return `${item}!`
    }
    const cases = [
      [],
      [1, 2, 3],
      ['a', 'b', 'c'],
    ]
    cases.forEach((input) => {
      const mapped = mapItemsWithArgs(input, transformItem)
      expect(mapped).toEqual(input.map(transformItem))
    })
  })

  test('should pass arguments to transformItem function', () => {
    const transformItem = (item: number, n1: number, n2: number) => {
      return item + n1 + n2
    }
    const cases = [
      [],
      [1, 2, 3],
      [10, 20, 30, 40],
    ]
    cases.forEach((input) => {
      const mapped = mapItemsWithArgs(input, transformItem, 5, 3)
      const normallyMapped = input.map((item) => item + 5 + 3)
      expect(mapped).toEqual(normallyMapped)
    })
  })

})
