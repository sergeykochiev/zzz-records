import StarrailCachedUrlParams from "@/common/types/Starrail/CachedUrlParams"
import StarrailGachaType from "@/common/types/dto/Starrail/GachaType"
import HoyoParams from "../../Hoyoverse/Params"
interface StarrailParams extends HoyoParams, Record<keyof Pick<StarrailCachedUrlParams, "gacha_type">, StarrailGachaType> {}
export default StarrailParams