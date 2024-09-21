import GachaTypeUnion from "@/common/types/GachaTypeUnion"
import ItemTypeUnion from "@/common/types/ItemTypeUnion"
import RankTypeUnion from "@/common/types/RankTypeUnion"
interface PullEntity<ItemType extends ItemTypeUnion, GachaType extends GachaTypeUnion, RankType extends RankTypeUnion> {
    uid: string,
    itemId: string
    time: string
    name: string
    id: string
    pity: number
    gachaType: GachaType
    rankType: RankType
    itemType: ItemType
}
export default PullEntity