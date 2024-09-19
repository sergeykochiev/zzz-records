import GenshinGachaType from "@/common/types/dto/Genshin/GachaType";
import PullEntity from "../../entities/Pull";
import GenshinRankType from "@/common/types/dto/Genshin/RankType";
import GenshinItemType from "@/common/types/dto/Genshin/ItemType";
interface GenshinPullEntity extends PullEntity<GenshinGachaType, GenshinRankType> {
    itemType: GenshinItemType
}
export default GenshinPullEntity