import ZenlessGachaType from "@/common/types/Zenless/GachaType"
import HoyoParams from "../../Hoyoverse/Params"
interface ZenlessParams extends HoyoParams {
    init_log_gacha_type: ZenlessGachaType
    init_log_gacha_base_type: ZenlessGachaType
    plat_type: 3
    gacha_type: ZenlessGachaType
    real_gacha_type: ZenlessGachaType
}
export default ZenlessParams