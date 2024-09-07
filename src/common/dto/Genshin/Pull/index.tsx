import ZenlessGachaType from "@/common/types/Zenless/GachaType";
import GenericHoyoPull from "../../Hoyoverse/HoyoPull";
import ZenlessItemType from "@/common/types/Zenless/ItemType";
import ZenlessRankType from "@/common/types/Zenless/RankType";
interface ZenlessPull extends GenericHoyoPull {
    gacha_type: ZenlessGachaType
    item_type: ZenlessItemType
    rank_type: ZenlessRankType
}
export default ZenlessPull