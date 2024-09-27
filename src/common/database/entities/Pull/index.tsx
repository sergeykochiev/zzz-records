import GachaTypeUnion from "@/common/types/union/GachaTypeUnion"
import ItemTypeUnion from "@/common/types/union/ItemTypeUnion"
import RankTypeUnion from "@/common/types/union/RankTypeUnion"
interface PullEntity<ItemType extends ItemTypeUnion, GachaType extends GachaTypeUnion, RankType extends RankTypeUnion> {
    uid: number,
    itemId: number
    time: string
    name: string
    id: number
    pity: number
    gachaType: GachaType
    rankType: RankType
    itemType: ItemType
}
export default PullEntity