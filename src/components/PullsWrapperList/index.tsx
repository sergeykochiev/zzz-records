import PullEntity from "@/common/database/entities/Pull"
import TargetRankTypesEnum from "@/common/types/TargetRankTypesEnum"
import PullElement from "../PullElement"
import RankTypeUnion from "@/common/types/RankTypeUnion"
interface PullsWrapperListProps<RankType extends RankTypeUnion> {
    pulls: PullEntity<any, RankType>[]
    rankTypes: TargetRankTypesEnum<RankType>
}
export default function PullsWrapperList<RankType extends RankTypeUnion>(props: PullsWrapperListProps<RankType>) {
    return <div className="flex flex-col w-full gap-[4px]">
        {props.pulls.map(pull => <PullElement key={pull.id} pull={pull} rankTypes={props.rankTypes}/>)}
    </div>
}