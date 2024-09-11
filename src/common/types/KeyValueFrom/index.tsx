type KeyValueFrom<T> = { [Key in keyof T]: T[Key] }
export default KeyValueFrom