import ZenlessGachaType from "@/common/types/Zenless/GachaType";
import ZenlessItemType from "@/common/types/Zenless/ItemType";
import ZenlessRankType from "@/common/types/Zenless/RankType";
import HoyoPull from "../../Hoyoverse/HoyoPull";
interface ZenlessPull extends HoyoPull {
    gacha_type: ZenlessGachaType
    item_type: ZenlessItemType
    rank_type: ZenlessRankType
}
export default ZenlessPull