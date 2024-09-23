import Games from "../../../enum/Games";
import BasePublicOperationUrl from "../base/PublicOperation";
import ChinaBannerListEndpoint from "../endpoints/ChinaBannerList";
import GachaLogEndpoint from "../endpoints/GachaLog";
export interface HoyoApiRouteProviderType {
    GACHA_LOG_URL: string
    CN_GACHA_LIST_URL: string
}
class HoyoApiRouteProvider implements HoyoApiRouteProviderType {
    public GACHA_LOG_URL: string
    public CN_GACHA_LIST_URL: string
    constructor(
        game: Games
    ) {
        this.GACHA_LOG_URL = BasePublicOperationUrl + "/" + GachaLogEndpoint[game]
        this.CN_GACHA_LIST_URL = BasePublicOperationUrl + "/" + ChinaBannerListEndpoint[game]
    }
}
export default HoyoApiRouteProvider