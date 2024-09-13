import GenshinGachaType from "@/common/types/dto/Genshin/GachaType"
import HoyoParams from "../../Hoyoverse/Params"
import GenshinGachaTypeField from "@/common/types/Genshin/GachaTypeField"
import GenshinCachedUrlParams from "@/common/types/Genshin/CachedUrlParams"
import HoyoParamsAbstractClass from "../../Hoyoverse/Params"
import minimumNeccesarryParams from "@/common/types/MinimumNessesaryParams"
interface GenshinParams extends HoyoParams, Record<GenshinGachaTypeField, GenshinGachaType> {}
export default GenshinParams