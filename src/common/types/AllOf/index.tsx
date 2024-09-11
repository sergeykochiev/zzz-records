type ValueFromKey<Key, Type> = (Key extends keyof Type ? Type[Key] : undefined)
type AllOf<F, G, T> = (F | G | T) & { [Key in (keyof F | keyof G | keyof T)]: Exclude<ValueFromKey<Key, F> | ValueFromKey<Key, G> | ValueFromKey<Key, T>, undefined> }
export default AllOf