import ItemTypeUnion from "@/common/types/ItemTypeUnion"
import GachaTypeUnion from "@/common/types/GachaTypeUnion"
import RankTypeUnion from "@/common/types/RankTypeUnion"
import HoyoWishHistoryPull from "../HoyoPull"
interface HoyoWishHistoryData<ItemType extends ItemTypeUnion, GachaType extends GachaTypeUnion, RankType extends RankTypeUnion> {
    page: string
    size: string
    region: string
    list: HoyoWishHistoryPull<ItemType, GachaType, RankType>[] 
    region_time_zone: number
}
export default HoyoWishHistoryData