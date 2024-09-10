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
import TargetGachaType from "@/common/types/functionDifferentiation/TargetGachaType"
import GamesGachaTypes from "@/common/maps/GamesGachaTypes"
import OneOf from "@/common/types/OneOf"
const GameTypes: Record<keyof typeof Games, Games> = {
    GENSHIN: 1,
    STARRAIL: 2,
    ZENLESS: 3
}
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

export function fetchPullsFactory<T extends Games>(game: T): FetchPullsFunctionType<T> {
    type Field = T extends Games.ZENLESS ? "real_gacha_type" : "gacha_type"
    const field: Field = game == Games.ZENLESS ? "real_gacha_type" : "gacha_type"
    const fetchPulls = async function(params: TargetParams<T>, fetchBannerRecursiveFunc: FetchBannerRecursiveFunctionType<T>): Promise<[PullEntity[], StatEntity[]]> {
        let pulls: PullEntity[] = []
        let stats: StatEntity[] = []
        for (let gachatype in (Object.values(GamesGachaTypes[game]) as TargetGachaType<T>[])) {
            params[field as ] = gachatype
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