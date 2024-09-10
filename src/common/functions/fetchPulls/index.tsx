import GenshinParamsClass from "@/common/api/Genshin/Params"
import StarrailParamsClass from "@/common/api/Starrail/Params"
import ZenlessParamsClass from "@/common/api/Zenless/Params"
import PullEntity from "@/common/database/entities/Pull"
import StatEntity from "@/common/database/entities/Stat"
import GenshinGachaType from "@/common/types/dto/Genshin/GachaType"
import StarrailGachaType from "@/common/types/dto/Starrail/GachaType"
import ZenlessGachaType from "@/common/types/dto/Zenless/GachaType"
import OneOf from "@/common/types/OneOf"
export default async function fetchPulls(params: ZenlessParamsClass | GenshinParamsClass | StarrailParamsClass) {
    let pulls: PullEntity[] = []
    let stats: StatEntity[] = []
    const gachaTypes = Object.values(params instanceof ZenlessParamsClass ? ZenlessGachaType : params instanceof GenshinParamsClass ? GenshinGachaType : StarrailGachaType)
    for (let gachatype in gachaTypes) {
        params[params instanceof ZenlessParamsClass ? "real_gacha_type" : "gacha_type"] = gachatype
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