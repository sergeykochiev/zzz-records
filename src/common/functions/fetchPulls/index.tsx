import GenshinParamsClass, { GenshinParams } from "@/common/api/Genshin/Params"
import HoyoParamsAbstractClass from "@/common/api/Hoyoverse/Params"
import StarrailParamsClass, { StarrailParams } from "@/common/api/Starrail/Params"
import ZenlessParamsClass, { ZenlessParams } from "@/common/api/Zenless/Params"
import PullEntity from "@/common/database/entities/Pull"
import StatEntity from "@/common/database/entities/Stat"
import GenshinGachaType from "@/common/types/dto/Genshin/GachaType"
import StarrailGachaType from "@/common/types/dto/Starrail/GachaType"
import ZenlessGachaType from "@/common/types/dto/Zenless/GachaType"
import Games from "@/common/types/Games"
import OneOf from "@/common/types/OneOf"
import Prettify from "@/common/types/prettify"
export default async function fetchPulls<T extends OneOf<ZenlessParamsClass, GenshinParamsClass, StarrailParamsClass>>(params: T) {
    type u = Prettify<OneOf<ZenlessParamsClass, GenshinParamsClass, StarrailParamsClass>>
    let pulls: PullEntity[] = []
    let stats: StatEntity[] = []
    type o = T extends ZenlessParamsClass ? ZenlessParamsClass : T extends GenshinParamsClass ? GenshinParamsClass : StarrailParamsClass
    const gachaTypes = Object.values(params instanceof ZenlessParamsClass ? ZenlessGachaType : params instanceof GenshinParamsClass ? GenshinGachaType : StarrailGachaType)
    const field: keyof typeof params = params instanceof ZenlessParamsClass ? "real_gacha_type" : "gacha_type"
    for (let gachatype in gachaTypes) {
        (params as o)[field] = gachatype;
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