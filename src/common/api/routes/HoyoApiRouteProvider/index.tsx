import Games from "../../../enum/Games";
import BasePublicOperationUrl from "../base/PublicOperation";
import baseWebstaticMihoyoUrl from "../base/WebstaticMihoyo";
import ChinaBannerListEndpoint from "../endpoints/ChinaBannerList";
import GachaLogEndpoint from "../endpoints/GachaLog";
class HoyoApiRouteProvider {
    public GACHA_LOG_URL: string
    public CN_GACHA_LIST_URL: string
    constructor(
        game: Games
    ) {
        this.GACHA_LOG_URL = BasePublicOperationUrl[game] + "/" + GachaLogEndpoint[game]
        this.CN_GACHA_LIST_URL = baseWebstaticMihoyoUrl + "/" + ChinaBannerListEndpoint[game]
    }
}
export default HoyoApiRouteProvider