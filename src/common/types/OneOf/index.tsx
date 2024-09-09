import GenshinGachaType from "../dto/Genshin/GachaType"
import StarrailGachaType from "../dto/Starrail/GachaType"
import ZenlessGachaType from "../dto/Zenless/GachaType"

// type CommonKeys<G, S, Z> = keyof G & keyof S & keyof Z
// type OneOf<G, S, Z> = (Record<CommonKeys<G, S, Z>, Z> | Record<keyof G | keyof S, never>) | (Record<CommonKeys<G, S, Z>, S> | Record<keyof G | keyof Z, never>) | (Record<CommonKeys<G, S, Z>, G> | Record<keyof S | keyof Z, never>)
// type f = (typeof ZenlessGachaType)[keyof typeof ZenlessGachaType]
// type a = keyof OneOf<typeof ZenlessGachaType, typeof GenshinGachaType, typeof StarrailGachaType>
type OneOf<Target, F, S, T> = (F | S | T) & (Target extends F ? F : Record<keyof Exclude<F, F | S | T>, never>) & (Target extends S ? S : Record<keyof Exclude<S, F | S | T>, never>) & (Target extends T ? T : Record<keyof Exclude<T, F | S | T>, never>)
export default OneOf