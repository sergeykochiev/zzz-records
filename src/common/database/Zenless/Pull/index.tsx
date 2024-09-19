import ZenlessGachaType from "@/common/types/dto/Zenless/GachaType";
import PullEntity from "../../entities/Pull";
import ZenlessRankType from "@/common/types/dto/Zenless/RankType";
import ZenlessItemType from "@/common/types/dto/Zenless/ItemType";
interface ZenlessPullEntity extends PullEntity<ZenlessGachaType, ZenlessRankType> {
    itemType: ZenlessItemType
}
export default ZenlessPullEntity