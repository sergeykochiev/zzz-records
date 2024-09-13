import GenshinGachaType from "@/common/types/dto/Genshin/GachaType"
import GachaLogApiRouteUrls from "@/common/enum/GachaLogRouteApiUrls"
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