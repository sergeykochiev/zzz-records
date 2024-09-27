import ItemTypeUnion from "@/common/types/union/ItemTypeUnion"
import GachaTypeUnion from "@/common/types/union/GachaTypeUnion"
import RankTypeUnion from "@/common/types/union/RankTypeUnion"
import HoyoWishHistoryPull from "../HoyoPull"
interface HoyoWishHistoryData<ItemType extends ItemTypeUnion, GachaType extends GachaTypeUnion, RankType extends RankTypeUnion> {
    page: `${number}`
    size: `${number}`
    total?: `${number}`
    region: string
    list: HoyoWishHistoryPull<ItemType, GachaType, RankType>[] 
    region_time_zone?: number
}
export default HoyoWishHistoryData