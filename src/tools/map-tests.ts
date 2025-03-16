import type { AnyTest, Test } from '../types/test-types'

type CreateTest<T extends AnyTest, A extends unknown[]> = (test: T, ...args: A) => Test

export function mapTests<T extends AnyTest, A extends unknown[]>(tests: T[], createTest: CreateTest<T, A>, ...args: A) {
  return tests.map((test) => createTest(test, ...args))
}
