import { PullEntity, StatEntity } from "@/app/db"
import HoyoParams from "@/common/types/Api/Hoyoverse/Params"
import fetchSingleGachaTypePulls from "../fetchSingleGachaTypePulls"
import ZenlessGachaType from "@/common/types/Zenless/GachaType"
import StringifiedHoyoParams from "@/common/types/StringifiedHoyoParams"
export default async function fetchPulls<TargetGachaType extends ZenlessGachaType>(rootUrl: string, params: StringifiedHoyoParams, gachaTypes: TargetGachaType): Promise<[PullEntity[], StatEntity[]]> {
    let pulls: PullEntity[] = []
    let stats: StatEntity[] = []
    for (let gachatype of Object.keys(gachaTypes)) {
        params.gacha_type = gachatype as TargetGachaType
        const bannerData = await fetchSingleGachaTypePulls(rootUrl, params)
        if (bannerData) {
            pulls.concat(bannerData[0])
            stats.concat(bannerData[1])
        }
    }
    // await db.pulls.bulkPut(pulls)
    // await db.stats.bulkPut(stats)
    return [pulls, stats]
}