interface HoyoParams {
    authkey_ver: number,
    authkey: string,
    sign_type: number,
    lang: string,
    game_biz: string,
    size: number
    end_id: string
    gacha_type?: number
    real_gacha_type?: number
}
export default HoyoParams