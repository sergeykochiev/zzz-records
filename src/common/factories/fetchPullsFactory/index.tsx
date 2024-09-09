import { PullEntity, StatEntity } from "@/app/db"
import GachaLogApiRouteUrls from "@/common/maps/GachaLogRouteApiUrls"
import ZenlessGachaType from "@/common/types/dto/Zenless/GachaType"
import GenshinGachaType from "@/common/types/dto/Genshin/GachaType"
import StarrailGachaType from "@/common/types/dto/Starrail/GachaType"
import Games from "@/common/types/Games"
import StarrailParams from "@/common/types/api/Starrail/Params"
import ZenlessParams from "@/common/types/api/Zenless/Params"
import HoyoParams from "@/common/types/api/Hoyoverse/Params"
import GenshinParams from "@/common/types/api/Genshin/Params"
import TargetParams from "@/common/types/functionDifferentiation/TargetParams"
type FetchBannerRecursiveFunctionType = (fn: {
    params: HoyoParams
}) => Promise<[PullEntity[], StatEntity] | void>
type FetchPullsFunctionType = (fn: {
    params: HoyoParams
    fetchBannerRecursiveFunc: FetchBannerRecursiveFunctionType
}) => Promise<[PullEntity[], StatEntity[]]>
const TargetGachaType = {
    1: GenshinGachaType,
    2: StarrailGachaType,
    3: ZenlessGachaType
}
export function fetchPullsFactory(game: Games): FetchPullsFunctionType {
    const field = game == Games.ZENLESS ? "real_gacha_type" : "gacha_type"
    const fetchPulls = async function(params: TargetParams<typeof game>) {
        let pulls: PullEntity[] = []
        let stats: StatEntity[] = []
        for (let gachatype of Object.values(TargetGachaType[game])) {
            params[field] = gachatype
            const bannerData = await 
            if (bannerData) {
                pulls.concat(bannerData[0])
                stats.concat(bannerData[1])
            }
        }
        // await db.pulls.bulkPut(pulls)
        // await db.stats.bulkPut(stats)
        return [pulls, stats]
    }
    return fetchPulls
}