import CachedUrlParams from "@/common/types/CachedUrlParams"
type minimumNeccesarryParams = "authkey_ver" | "authkey" | "lang" | "game_biz" | "size" | "end_id"
interface HoyoParams extends Record<keyof Pick<CachedUrlParams, minimumNeccesarryParams>, string | number> {
    authkey_ver: number,
    authkey: string,
    lang: string,
    game_biz: string,
    size: number
    end_id: number
}
export default HoyoParams