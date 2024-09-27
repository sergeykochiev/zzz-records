import PullEntity from "@/common/database/entities/Pull"
import TargetRankTypesEnum from "@/common/types/targetGeneric/TargetRankTypesEnum"
import PullElement from "../PullElement"
import RankTypeUnion from "@/common/types/union/RankTypeUnion"
import ItemTypeUnion from "@/common/types/union/ItemTypeUnion"
import GachaTypeUnion from "@/common/types/union/GachaTypeUnion"
interface PullsWrapperListProps<RankType extends RankTypeUnion, ItemType extends ItemTypeUnion = any, GachaType extends GachaTypeUnion = any> {
    pulls: PullEntity<ItemType, GachaType, RankType>[]
    rankTypes: TargetRankTypesEnum<RankType>
}
export default function PullsWrapperList<RankType extends RankTypeUnion>(props: PullsWrapperListProps<RankType>) {
    return <div className="flex flex-col w-full gap-[4px]">
        {props.pulls.map(pull => <PullElement key={pull.id} pull={pull} rankTypes={props.rankTypes}/>)}
    </div>
}