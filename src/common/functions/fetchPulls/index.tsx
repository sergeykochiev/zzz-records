import GenshinApiClass from "@/common/api/Genshin"
import GenshinParamsClass from "@/common/api/Genshin/Params"
import StarrailApiClass from "@/common/api/Starrail"
import ZenlessApiClass from "@/common/api/Zenless"
import ZenlessParamsClass, { ZenlessParams } from "@/common/api/Zenless/Params"
import PullEntity from "@/common/database/entities/Pull"
import StatEntity from "@/common/database/entities/Stat"
import GenshinGachaType from "@/common/types/dto/Genshin/GachaType"
import StarrailGachaType from "@/common/types/dto/Starrail/GachaType"
import ZenlessGachaType from "@/common/types/dto/Zenless/GachaType"
import TargetParams from "@/common/types/functionDifferentiation/TargetParams"
export default async function fetchPulls<Api extends OneOf<GenshinApiClass, StarrailApiClass, ZenlessApiClass>>(api: Api) {
    let pulls: PullEntity[] = []
    let stats: StatEntity[] = []
    const field = api instanceof ZenlessApiClass ? "real_gacha_type" : "gacha_type" as Params extends ZenlessParams ? "real_gacha_type" : "gacha_type"
    const gachaTypes = Object.values(params instanceof ZenlessParamsClass ? ZenlessGachaType : params instanceof GenshinParamsClass ? GenshinGachaType : StarrailGachaType)
    for (let gachatype of gachaTypes) {
        params[field] = gachatype
        const bannerData = await fetchBannerRecursiveFunc(new )
        if (bannerData) {
            pulls.concat(bannerData[0])
            stats.push(bannerData[1])
        }
    }
    // await db.pulls.bulkPut(pulls)
    // await db.stats.bulkPut(stats)
    return [pulls, stats]
}
export type { TargetParams }