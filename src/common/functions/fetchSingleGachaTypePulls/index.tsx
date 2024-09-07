import HoyoParams from "@/common/types/Api/Hoyoverse/Params";
import fetchBannerRecursive from "../fetchBannerRecursive";
import { PullEntity, StatEntity } from "@/app/db";
import StringifiedHoyoParams from "@/common/types/StringifiedHoyoParams";
export default async function fetchSingleGachaTypePulls(rootUrl: string, params: StringifiedHoyoParams): Promise<[PullEntity[], StatEntity] | void> {
    // console.log(`Fetching from banner ${gachatype}`)
    const bannerData = await fetchBannerRecursive(rootUrl, params)
    if (!bannerData) {
        console.log("error occured while fetching pulls")
        return
    }
    // console.log(`Fetched ${gachatypePulls[0].length} pulls from banner ${gachatype}`)
    return bannerData
}