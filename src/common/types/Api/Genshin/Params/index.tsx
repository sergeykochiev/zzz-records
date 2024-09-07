import GenshinGachaType from "@/common/types/dto/Genshin/GachaType";
import GenshinCachedUrlParams from "@/common/types/Genshin/CachedUrlParams";
import HoyoParams from "../../Hoyoverse/Params";
interface GenshinParams extends HoyoParams, Record<keyof Pick<GenshinCachedUrlParams, "gacha_type">, GenshinGachaType> {}
export default GenshinParams
