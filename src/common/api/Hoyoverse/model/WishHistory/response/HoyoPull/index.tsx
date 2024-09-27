import GachaTypeUnion from "@/common/types/union/GachaTypeUnion"
import ItemTypeUnion from "@/common/types/union/ItemTypeUnion"
import RankTypeUnion from "@/common/types/union/RankTypeUnion"
interface HoyoWishHistoryPull<ItemType extends ItemTypeUnion, GachaType extends GachaTypeUnion, RankType extends RankTypeUnion> {
    uid: `${number}`
    gacha_id?: `${number}`
    item_id: ""
    count: "1"
    time: string
    name: string
    lang: string
    id: `${number}`
    item_type: `${ItemType}`
    rank_type: `${RankType}`
    gacha_type: `${GachaType}`
}
export default HoyoWishHistoryPull