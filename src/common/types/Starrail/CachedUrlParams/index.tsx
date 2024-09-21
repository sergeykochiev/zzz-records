import CachedUrlParams from "../../CachedUrlParams"
import StarrailGachaType from "../GachaType"
interface StarrailCachedUrlParams extends CachedUrlParams {
    default_gacha_type: `${StarrailGachaType}`
    plat_type: string
    os_system: string
    device_model: string
    gacha_type: `${StarrailGachaType}`
}
export default StarrailCachedUrlParams