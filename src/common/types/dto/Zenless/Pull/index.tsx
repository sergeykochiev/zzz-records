import ZenlessGachaType from "@/common/types/dto/Zenless/GachaType";
import ZenlessItemType from "@/common/types/dto/Zenless/ItemType";
import ZenlessRankType from "@/common/types/dto/Zenless/RankType";
import HoyoPull from "../../Hoyoverse/HoyoPull";
interface ZenlessPull extends HoyoPull {
    real_gacha_type: ZenlessGachaType
    item_type: ZenlessItemType
    rank_type: ZenlessRankType
}
export default ZenlessPull