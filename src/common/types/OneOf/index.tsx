type Common<G, S, Z> = Record<keyof G | keyof S | keyof Z, G[keyof G] | S[keyof S] | Z[keyof Z]>
type OneOf<G, S, Z> = (Common<G, S, Z> & Record<keyof G & keyof S, never>) | (Common<G, S, Z> & Record<keyof G & keyof Z, never>) | (Common<G, S, Z> & Record<keyof S & keyof Z, never>)
export default OneOf