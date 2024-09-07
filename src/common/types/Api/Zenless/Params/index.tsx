import ZenlessGachaType from "@/common/types/dto/Zenless/GachaType"
import ZenlessCachedUrlParams from "@/common/types/Zenless/CachedUrlParams"
import HoyoParams from "../../Hoyoverse/Params"
interface ZenlessParams extends HoyoParams, Record<keyof Pick<ZenlessCachedUrlParams, "real_gacha_type">, ZenlessGachaType> {}
export default ZenlessParams