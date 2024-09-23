import GachaTypeUnion from "@/common/types/GachaTypeUnion"
import ItemTypeUnion from "@/common/types/ItemTypeUnion"
import RankTypeUnion from "@/common/types/RankTypeUnion"
interface HoyoWishHistoryPull<ItemType extends ItemTypeUnion, GachaType extends GachaTypeUnion, RankType extends RankTypeUnion> {
    uid: string
    gacha_id: string
    item_id: string
    count: "1"
    time: string
    name: string
    lang: string
    id: string
    item_type: `${ItemType}`
    rank_type: `${RankType}`
    gacha_type: `${GachaType}`
}
export default HoyoWishHistoryPull