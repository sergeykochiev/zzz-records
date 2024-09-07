import HoyoParams from "@/common/dto/Hoyoverse/HoyoParams";
import fetchBannerRecursive from "../fetchBannerRecursive";
import { PullEntity, StatEntity } from "@/app/db";
export default async function fetchSingleGachaTypePulls(rootUrl: string, params: HoyoParams): Promise<[PullEntity[], StatEntity] | void> {
    // console.log(`Fetching from banner ${gachatype}`)
    const bannerData = await fetchBannerRecursive(rootUrl, params)
    if (!bannerData) {
        console.log("error occured while fetching pulls")
        return
    }
    // console.log(`Fetched ${gachatypePulls[0].length} pulls from banner ${gachatype}`)
    return bannerData
}