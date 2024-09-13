import StarrailGachaType from "@/common/types/dto/Starrail/GachaType"
import GachaLogApiRouteUrls from "@/common/enum/GachaLogRouteApiUrls"
import HoyoApiClass from "../Hoyoverse"
import StarrailRankType from "@/common/types/dto/Starrail/RankType"
class StarrailApiClass extends HoyoApiClass<StarrailGachaType> {
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
            StarrailRankType,
            StarrailGachaType,
            GachaLogApiRouteUrls.STARRAIL
        )
    }
}
export default StarrailApiClass