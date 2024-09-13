import ZenlessGachaType from "@/common/types/dto/Zenless/GachaType"
import HoyoParams from "../../Hoyoverse/Params"
import ZenlessGachaTypeField from "@/common/types/Zenless/GachaTypeField"
import ZenlessCachedUrlParams from "@/common/types/Zenless/CachedUrlParams"
import HoyoParamsAbstractClass from "../../Hoyoverse/Params"
import minimumNeccesarryParams from "@/common/types/MinimumNessesaryParams"
interface ZenlessParams extends HoyoParams, Record<ZenlessGachaTypeField, ZenlessGachaType> {}
export default ZenlessParams