import CachedUrlParams from "@/common/types/CachedUrlParams"
interface HoyoParams {
    authkey_ver: number,
    authkey: string,
    lang: string,
    game_biz: string,
    size: number
    end_id: number
    gacha_type?: number
    real_gacha_type?: number
}
export default HoyoParams