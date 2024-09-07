import CachedUrlParams from "../../CachedUrlParams"
import ZenlessGachaType from "../../dto/Zenless/GachaType"
interface ZenlessCachedUrlParams extends CachedUrlParams {
    init_log_gacha_type: `${ZenlessGachaType}`
    init_log_gacha_base_type: `${ZenlessGachaType}`
    ui_layout: string
    button_mode: string
    plat_type: string
    gacha_type: `${ZenlessGachaType}`
    real_gacha_type: `${ZenlessGachaType}`
}
export default ZenlessCachedUrlParams