import CachedUrlParams from "../../CachedUrlParams"
import GenshinGachaType from "../GachaType"
interface GenshinCachedUrlParams extends CachedUrlParams {
    init_type: `${GenshinGachaType}`
    device_type: string
    game_version: string
    gacha_type: `${GenshinGachaType}`
}
export default GenshinCachedUrlParams