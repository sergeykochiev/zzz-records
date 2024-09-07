import ZenlessGachaType from "@/common/types/Zenless/GachaType"

interface ZenlessParams {
    authkey_ver: 1
    sign_type: number
    gacha_id: string
    timestamp: string
    init_log_gacha_type: number
    init_log_gacha_base_type: number
    plat_type: 3
    authkey: string
    lang: string //en
    region: string
    game_biz: string
    size: string
    gacha_type: ZenlessGachaType
    real_gacha_type: number
    end_id: number
}

interface GenshinParams {
    authkey_ver: 1 //1,
    sign_type: number //2,
    init_type: number //301,
    gacha_id: string
    lang: string //ru
    authkey: string
    game_biz: string
    region: string
    gacha_type: string //301
    page: string
    size: number
    end_id: number
}
type HoyoParams = ZenlessParams & GenshinParams
export default HoyoParams