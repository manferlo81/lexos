type List<T> = readonly T[]
type SingleOrList<T> = T | List<T>

export type TestPassed = 'passed'
export type TestFailed = 'failed'
export type TestResult = TestPassed | TestFailed

type LooseExtends<T, P> = T extends P ? TestPassed : TestFailed
export type Ternary<T extends TestResult, A extends TestResult, B extends TestResult> = TestFailed extends T ? B : A

export type Or<T extends List<TestResult>> = LooseExtends<TestPassed, T[number]>
export type Not<T extends TestResult> = Ternary<T, TestFailed, TestPassed>
export type And<T extends List<TestResult>> = Not<LooseExtends<TestFailed, T[number]>>

export type Extends<T extends P, P> = LooseExtends<T, P>
export type ObjectPropertyExtends<O extends object, K extends keyof O, V extends O[K]> = LooseExtends<O[K], V>

export type Equals<A, B extends A> = And<[LooseExtends<A, B>, LooseExtends<B, A>]>
export type ObjectPropertyEquals<O extends object, K extends keyof O, V extends O[K]> = Equals<O[K], V>

export type Expect<T extends TestPassed> = T
export type Assert<T extends SingleOrList<TestPassed>> = T extends List<TestResult> ? T[number] : T
