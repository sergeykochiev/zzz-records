import ZenlessGachaType from "@/common/types/dto/Zenless/GachaType"
import GachaLogApiRouteUrls from "@/common/enum/GachaLogRouteApiUrls"
import HoyoApiClass from "../Hoyoverse"
import ZenlessRankType from "@/common/types/dto/Zenless/RankType"
class ZenlessApiClass extends HoyoApiClass<ZenlessGachaType> {
    constructor(
        authkey: string,
        lang: string,
        gameBiz: string,
    ) {
        super(
            authkey,
            lang,
            gameBiz,
            "real_gacha_type",
            ZenlessRankType,
            ZenlessGachaType,
            GachaLogApiRouteUrls.ZENLESS
        )
    }
}
export default ZenlessApiClass