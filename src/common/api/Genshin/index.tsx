import GenshinCachedUrlParams from "@/common/types/Genshin/CachedUrlParams"
import minimumNeccesarryParams from "@/common/types/MinimumNessesaryParams"
import GenshinGachaType from "@/common/types/dto/Genshin/GachaType"
import GenshinParams from "./Params"
import GachaLogApiRouteUrls from "@/common/types/GachaLogRouteApiUrls"
import GenshinGachaTypeField from "@/common/types/Genshin/GachaTypeField"
import HoyoApiClass from "../Hoyoverse"
import GenshinRankType from "@/common/types/dto/Genshin/RankType"
class GenshinApiClass extends HoyoApiClass<GenshinGachaType> {
    constructor(
        authkey: string,
        lang: string,
        gameBiz: string,
    ) {
        super(
            authkey,
            lang,
            gameBiz,
            "gacha_type",
            GenshinRankType,
            GenshinGachaType,
            GachaLogApiRouteUrls.GENSHIN
        )
    }
}
export default GenshinApiClass