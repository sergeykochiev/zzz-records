import HoyoPull from "../../Hoyoverse/HoyoPull";
import GenshinGachaType from "../GachaType";
import GenshinItemType from "../ItemType";
import GenshinRankType from "../RankType";
interface GenshinPull extends HoyoPull {
    gacha_type: `${GenshinGachaType}`
    item_type: `${GenshinItemType}`
    rank_type: `${GenshinRankType}`
}
export default GenshinPull