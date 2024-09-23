import ItemTypeUnion from "@/common/types/ItemTypeUnion";
import GenericHoyoResponse from "../model/genericResponse";
import HoyoWishHistoryParams from "../model/WishHistory/params";
import GachaTypeUnion from "@/common/types/GachaTypeUnion";
import RankTypeUnion from "@/common/types/RankTypeUnion";
import HoyoWishHistoryData from "../model/WishHistory/response/data";
import HoyoBannerListData from "../model/BannerList/response/data";
import HoyoApiRouteProvider from "../../routes/HoyoApiRouteProvider";
class HoyoApi<ItemType extends ItemTypeUnion, GachaType extends GachaTypeUnion, RankType extends RankTypeUnion> {
    constructor(
        private apiRouteProvider: HoyoApiRouteProvider
    ) {}
    private getUrl(url: string, params?: Record<string, string>) {
        return `${url}?${params && new URLSearchParams(params)}`
    }
    private async fetchAndHandleApi<R extends GenericHoyoResponse<any>>(url: string): Promise<R> {
        const response = await fetch(url)
        if (!response.ok) throw new Error()
        const json: R = await response.json()
        return json
    }
    public async getWishHistory<R extends GenericHoyoResponse<HoyoWishHistoryData<ItemType, GachaType, RankType>>>(params: Record<keyof HoyoWishHistoryParams<GachaType>, string>): Promise<R> {
        try {
            return await this.fetchAndHandleApi<R>(this.getUrl(this.apiRouteProvider.GACHA_LOG_URL, params))
        } catch(e) {
            throw e
        }
    }
    public async getBannerList<R extends GenericHoyoResponse<HoyoBannerListData<GachaType>>>(): Promise<R> {
        try {
            return await this.fetchAndHandleApi<R>(this.getUrl(this.apiRouteProvider.CN_GACHA_LIST_URL))
        } catch(e) {
            throw e
        }
    }
}
export default HoyoApi