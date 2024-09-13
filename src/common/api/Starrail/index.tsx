import StarrailCachedUrlParams from "@/common/types/Starrail/CachedUrlParams"
import HoyoApiAbstractClass, { HoyoApi } from "../Hoyoverse"
import minimumNeccesarryParams from "@/common/types/MinimumNessesaryParams"
import StarrailGachaType from "@/common/types/dto/Starrail/GachaType"
import StarrailParams from "./Params"
import GachaLogApiRouteUrls from "@/common/types/GachaLogRouteApiUrls"
import StarrailGachaTypeField from "@/common/types/Starrail/GachaTypeField"
interface StarrailApi extends HoyoApi {
    params: StarrailParams
    getStringifiedParams: () => Pick<StarrailCachedUrlParams, minimumNeccesarryParams | StarrailGachaTypeField>
}
class StarrailApiClass extends HoyoApiAbstractClass implements StarrailApi {
    params = { ...super.getParams(),
        gacha_type: StarrailGachaType.STANDART
    }
    url = GachaLogApiRouteUrls.GENSHIN
    constructor(
        authkey: string,
        authkey_ver: string,
        game_biz: string,
        lang: string,
        size: string,
        end_id: string,
        gacha_type: StarrailGachaType
    ) {
        super(authkey_ver, authkey, lang, game_biz, size, end_id)
        this.params = Object.assign(super.getParams(), {
            gacha_type: gacha_type
        })
    }
    getStringifiedParams() {
        return Object.assign(super.getStringifiedParams(), {
            gacha_type: ('' + this.params.gacha_type) as `${StarrailGachaType}`
        })
    }
}
export default StarrailApiClass