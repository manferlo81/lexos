type List<T> = readonly T[]
type ExtendsTernary<A, B, P, F> = A extends B ? P : F

export type Or<T extends List<boolean>> = ExtendsTernary<true, T[number], true, false>
export type And<T extends List<boolean>> = ExtendsTernary<false, T[number], false, true>
export type Not<T extends boolean> = ExtendsTernary<false, T, false, true>

export type AssignableTo<A extends B, B> = ExtendsTernary<A, B, true, false>
export type Equals<A, B extends A> = And<[ExtendsTernary<A, B, true, false>, ExtendsTernary<B, A, true, false>]>

export type Expect<T extends true> = T
