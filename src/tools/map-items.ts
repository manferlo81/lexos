type TransformItem<T, R, A extends unknown[] = []> = (item: T, ...args: A) => R

export function mapItemsWithArgs<T, R>(items: T[], transformItem: TransformItem<T, R>): R[]
export function mapItemsWithArgs<T, R, A extends unknown[]>(items: T[], transformItem: TransformItem<T, R, A>, ...args: A): R[]
export function mapItemsWithArgs<T, R, A extends unknown[]>(items: T[], transformItem: TransformItem<T, R, A>, ...args: A): R[] {
  const mapFunction = (item: T): R => transformItem(item, ...args)
  return items.map(mapFunction)
}
