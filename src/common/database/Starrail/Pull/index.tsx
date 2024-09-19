import StarrailGachaType from "@/common/types/dto/Starrail/GachaType";
import PullEntity from "../../entities/Pull";
import StarrailRankType from "@/common/types/dto/Starrail/RankType";
import StarrailItemType from "@/common/types/dto/Starrail/ItemType";
interface StarrailPullEntity extends PullEntity<StarrailGachaType, StarrailRankType> {
    itemType: StarrailItemType
}
export default StarrailPullEntity