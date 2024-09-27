import GachaTypeUnion from "@/common/types/union/GachaTypeUnion"
interface HoyoWishHistoryParams<GachaType extends GachaTypeUnion> {
    authkey_ver: number,
    authkey: string,
    sign_type: number,
    lang: string,
    game_biz: string,
    size: number
    end_id: string
    gacha_type?: GachaType
    real_gacha_type?: GachaType
}
export default HoyoWishHistoryParams