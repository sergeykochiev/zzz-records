import StarrailGachaType from "../GachaType";
import StarrailItemType from "../ItemType";
import StarrailRankType from "../RankType";
import HoyoPull from "../../Hoyoverse/HoyoPull";
interface StarrailPull extends HoyoPull {
    gacha_type: `${StarrailGachaType}`
    item_type: `${StarrailItemType}`
    rank_type: `${StarrailRankType}`
}
export default StarrailPull