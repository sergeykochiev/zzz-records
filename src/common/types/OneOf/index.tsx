type OneOf<F, S, T> = ({ [H in Exclude<keyof (S & T), keyof F>]: never } & F) | ({ [H in Exclude<keyof (F & T), keyof S>]: never } & S) | ({ [H in Exclude<keyof (S & F), keyof T>]: never } & T) & T
export default OneOf