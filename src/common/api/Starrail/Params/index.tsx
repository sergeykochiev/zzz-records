import StarrailGachaType from "@/common/types/dto/Starrail/GachaType"
import HoyoParams from "../../Hoyoverse/Params"
import StarrailGachaTypeField from "@/common/types/Starrail/GachaTypeField"
import StarrailCachedUrlParams from "@/common/types/Starrail/CachedUrlParams"
import HoyoParamsAbstractClass from "../../Hoyoverse/Params"
import minimumNeccesarryParams from "@/common/types/MinimumNessesaryParams"
interface StarrailParams extends HoyoParams, Record<StarrailGachaTypeField, StarrailGachaType> {}
export default StarrailParams