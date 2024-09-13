import ZenlessCachedUrlParams from "@/common/types/Zenless/CachedUrlParams"
import HoyoApiAbstractClass, { HoyoApi } from "../Hoyoverse"
import minimumNeccesarryParams from "@/common/types/MinimumNessesaryParams"
import ZenlessGachaType from "@/common/types/dto/Zenless/GachaType"
import ZenlessParams from "./Params"
import GachaLogApiRouteUrls from "@/common/types/GachaLogRouteApiUrls"
import ZenlessGachaTypeField from "@/common/types/Zenless/GachaTypeField"
import StatEntity from "@/common/database/entities/Stat"
import PullEntity from "@/common/database/entities/Pull"
interface ZenlessApi extends HoyoApi {
    params: ZenlessParams
    getStringifiedParams: () => Pick<ZenlessCachedUrlParams, minimumNeccesarryParams | ZenlessGachaTypeField>
}
class ZenlessApiClass extends HoyoApiAbstractClass implements ZenlessApi {
    params = { ...super.getParams(),
        real_gacha_type: ZenlessGachaType.STANDART
    }
    url = GachaLogApiRouteUrls.GENSHIN
    constructor(
        authkey: string,
        authkey_ver: string,
        game_biz: string,
        lang: string,
        size: string,
        end_id: string,
        real_gacha_type: ZenlessGachaType
    ) {
        super(authkey_ver, authkey, lang, game_biz, size, end_id)
        this.params = Object.assign(super.getParams(), {
            real_gacha_type: real_gacha_type
        })
    }
    getStringifiedParams() {
        return Object.assign(super.getStringifiedParams(), {
            real_gacha_type: ('' + this.params.real_gacha_type) as `${ZenlessGachaType}`
        })
    }
    async fetchPulls() {
        let pulls: PullEntity[] = []
        let stats: StatEntity[] = []
        for (let gachatype of Object.values(ZenlessGachaType)) {
            this.params.real_gacha_type = gachatype as ZenlessGachaType
            const bannerData = await this.fetchBannerRecursive()
            if (bannerData) {
                pulls.concat(bannerData[0])
                stats.push(bannerData[1])
            }
        }
        // await db.pulls.bulkPut(pulls)
        // await db.stats.bulkPut(stats)
        return [pulls, stats]
    }
    async fetchBannerRecursive() {

    }
}
export default ZenlessApiClass