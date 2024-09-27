import PullEntity from "@/common/database/entities/Pull"
import RankTypeUnion from "@/common/types/union/RankTypeUnion"
import TargetRankTypesEnum from "@/common/types/targetGeneric/TargetRankTypesEnum"
import ItemTypeUnion from "@/common/types/union/ItemTypeUnion"
import GachaTypeUnion from "@/common/types/union/GachaTypeUnion"
interface PullElementProps<RankType extends RankTypeUnion, ItemType extends ItemTypeUnion = any, GachaType extends GachaTypeUnion = any> {
    pull: PullEntity<ItemType, GachaType, RankType>
    rankTypes: TargetRankTypesEnum<RankType>
}
export default function PullElement<RankType extends RankTypeUnion>(props: PullElementProps<RankType>) {
    const conditionalClassname = props.pull.rankType == props.rankTypes.LEGENDARY ? "bg-hwh-element-legendary-dark" : props.pull.rankType == props.rankTypes.EPIC ? "bg-hwh-element-epic-dark" : "bg-hwh-element-dark"
    return <div className={`select-none w-full cursor-pointer text-hwh-body-text-dark transition-all grid grid-cols-5 whitespace-nowrap py-[4px] rounded-[8px] place-items-center ${conditionalClassname}`}>
        <div>{props.pull.name}</div>
        <div>{props.pull.time}</div>
        <div>{props.pull.itemType}</div>
        <div>{props.pull.rankType}</div>
        <div>{props.pull.pity}</div>
    </div>
}