import ItemTypeUnion from "@/common/types/ItemTypeUnion"
import HoyoPull from "../HoyoPull"
import GachaTypeUnion from "@/common/types/GachaTypeUnion"
import RankTypeUnion from "@/common/types/RankTypeUnion"
interface HoyoData<ItemType extends ItemTypeUnion, GachaType extends GachaTypeUnion, RankType extends RankTypeUnion> {
    page: string
    size: string
    region: string
    list: HoyoPull<ItemType, GachaType, RankType>[] 
    region_time_zone: number
}
export default HoyoData