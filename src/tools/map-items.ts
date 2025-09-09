type TransformItem<T, R, A extends unknown[] = []> = (item: T, ...args: A) => R

export function mapItemsWithArgs<T, R>(items: readonly T[], transformItem: TransformItem<T, R>): R[]
export function mapItemsWithArgs<T, R, A extends unknown[]>(items: readonly T[], transformItem: TransformItem<T, R, A>, ...args: A): R[]
export function mapItemsWithArgs<T, R, A extends unknown[]>(items: readonly T[], transformItem: TransformItem<T, R, A>, ...args: A): R[] {
  return items.map(
    (item: T): R => transformItem(item, ...args),
  )
}
