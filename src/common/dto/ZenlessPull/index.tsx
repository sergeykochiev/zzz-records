import ZZZGachaType from "@/common/types/Zenless/GachaType";
import GenericHoyoPull from "../../GenericHoyoPull";
import ZZZItemType from "@/common/types/Zenless/ItemType";
import ZZZRankType from "@/common/types/Zenless/RankType";
interface ZZZPull extends GenericHoyoPull {
    gacha_type: ZZZGachaType
    item_type: ZZZItemType
    rank_type: ZZZRankType
}
export default ZZZPull