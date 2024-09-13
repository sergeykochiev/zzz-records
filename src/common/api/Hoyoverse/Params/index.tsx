import CachedUrlParams from "@/common/types/CachedUrlParams"
import minimumNeccesarryParams from "@/common/types/MinimumNessesaryParams"
interface HoyoParams extends Record<keyof Pick<CachedUrlParams, minimumNeccesarryParams>, string | number> {
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