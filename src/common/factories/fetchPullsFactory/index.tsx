import { PullEntity, StatEntity } from "@/app/db"
import GachaLogApiRouteUrls from "@/common/maps/GachaLogRouteApiUrls"
import ZenlessGachaType from "@/common/types/dto/Zenless/GachaType"
import GenshinGachaType from "@/common/types/dto/Genshin/GachaType"
import StarrailGachaType from "@/common/types/dto/Starrail/GachaType"
import Games from "@/common/types/Games"
import StarrailParams from "@/common/api/Starrail/Params"
import ZenlessParams from "@/common/api/Zenless/Params"
import HoyoParams from "@/common/api/Hoyoverse/Params"
import GenshinParams from "@/common/api/Genshin/Params"
import TargetParams from "@/common/types/functionDifferentiation/TargetParams"
import TargetGachaType from "@/common/types/functionDifferentiation/TargetGachaType"
import GamesGachaTypes from "@/common/maps/GamesGachaTypes"
import OneOf from "@/common/types/OneOf"
import ZenlessGachaTypeField from "@/common/types/Zenless/GachaTypeField"
import CommonGachaTypeField from "@/common/types/CommonGachaTypeField"
type FetchBannerRecursiveFunctionType<T> = (
    params: HoyoParams,
    pulls?: PullEntity[],
    stat?: StatEntity,
    helpers?: {}
) => Promise<[PullEntity[], StatEntity] | void>
type FetchPullsFunctionType<T extends Games> = (
    params: TargetParams<T>,
    fetchBannerRecursiveFunc: FetchBannerRecursiveFunctionType<T>
) => Promise<[PullEntity[], StatEntity[]]>
type GachaFieldConditional<T extends Games> = T extends Games.ZENLESS ? ZenlessGachaTypeField : CommonGachaTypeField
export function fetchPullsFactory(game: Games): FetchPullsFunctionType<T> {
    const field: GachaFieldConditional<T> = game == Games.ZENLESS ? "real_gacha_type" : "gacha_type"
    const fetchPulls = async function(params: ZenlessParams | GenshinParams, fetchBannerRecursiveFunc: FetchBannerRecursiveFunctionType<T>): Promise<[PullEntity[], StatEntity[]]> {
        let pulls: PullEntity[] = []
        let stats: StatEntity[] = []
        for (let gachatype in (Object.values(GamesGachaTypes[game]) as TargetGachaType<T>[])) {
            params[field] = 
            const bannerData = await fetchBannerRecursiveFunc(params)
            if (bannerData) {
                pulls.concat(bannerData[0])
                stats.push(bannerData[1])
            }
        }
        // await db.pulls.bulkPut(pulls)
        // await db.stats.bulkPut(stats)
        return [pulls, stats]
    }
    return fetchPulls
}