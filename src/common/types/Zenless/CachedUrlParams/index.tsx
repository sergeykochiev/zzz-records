import ZenlessGachaType from "../GachaType"

interface ZenlessCachedUrlParams {
    authkey_ver: string
    sign_type: string
    auth_appid: string
    win_mode: string
    gacha_id: string
    timestamp: string
    init_log_gacha_type: `${ZenlessGachaType}`
    init_log_gacha_base_type: `${ZenlessGachaType}`
    ui_layout: string
    button_mode: string
    plat_type: string
    authkey: string
    lang: string
    region: string
    game_biz: string
    page: string
    size: string
    gacha_type: `${ZenlessGachaType}`
    real_gacha_type: `${ZenlessGachaType}`
    end_id: string
}