type FirstAndNeverOther<F, S, T> = { [Key in Exclude<keyof (S & T), keyof F>]: never } & F
type OneOf<F, S, T> = FirstAndNeverOther<F, S, T> | FirstAndNeverOther<S, F, T> | FirstAndNeverOther<T, F, S>
export default OneOf