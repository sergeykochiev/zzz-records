import { PullEntity, StatEntity } from "@/app/db"
import OneOfParams from "@/common/types/api/exclusive/Params"
import OneOfGachaType from "@/common/types/dto/exclusive/GachaType"
import fetchBannerRecursive from "../fetchBannerRecursive"
export default async function fetchPulls(rootUrl: string, params: OneOfParams, gachaTypes: OneOfGachaType): Promise<[PullEntity[], StatEntity[]]> {
    let pulls: PullEntity[] = []
    let stats: StatEntity[] = []
    for (let gachatype of Object.values(gachaTypes)) {
        params.gacha_type = gachatype as TargetGachaType
        const bannerData = await fetchBannerRecursive(rootUrl, params)
        if (bannerData) {
            pulls.concat(bannerData[0])
            stats.concat(bannerData[1])
        }
    }
    // await db.pulls.bulkPut(pulls)
    // await db.stats.bulkPut(stats)
    return [pulls, stats]
}