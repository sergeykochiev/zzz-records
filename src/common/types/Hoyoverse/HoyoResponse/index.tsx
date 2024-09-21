import ItemTypeUnion from "@/common/types/ItemTypeUnion"
import HoyoData from "../HoyoData"
import GachaTypeUnion from "@/common/types/GachaTypeUnion"
import RankTypeUnion from "@/common/types/RankTypeUnion"
interface HoyoResponse<ItemType extends ItemTypeUnion, GachaType extends GachaTypeUnion, RankType extends RankTypeUnion> {
    message: string,
    retcode: number,
    data: HoyoData<ItemType, GachaType, RankType>
}
export default HoyoResponse