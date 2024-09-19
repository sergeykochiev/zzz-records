import GachaTypeUnion from "@/common/types/GachaTypeUnion"
import RankTypeUnion from "@/common/types/RankTypeUnion"
interface PullEntity<GachaType extends GachaTypeUnion, RankType extends RankTypeUnion> {
    uid: string,
    itemId: string
    time: string
    name: string
    id: string
    pity: number
    gachaType: GachaType
    rankType: RankType
    itemType: string
}
export default PullEntity