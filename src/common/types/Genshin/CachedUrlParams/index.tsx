import GenshinGachaType from "../GachaType"
interface GenshinCachedUrlParams {
    win_mode: string
    authkey_ver: string
    sign_type: string
    auth_appid: string
    init_type: `${GenshinGachaType}`
    gacha_id: string
    lang: string
    device_type: string
    game_version: string
    region: string
    authkey: string
    game_biz: string
    gacha_type: `${GenshinGachaType}`
    page: string
    size: string
    end_id: string
}
export default GenshinCachedUrlParams