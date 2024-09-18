import PullEntity from "@/common/database/entities/Pull"
import GenshinRankType from "@/common/types/dto/Genshin/RankType"
import StarrailRankType from "@/common/types/dto/Starrail/RankType"
import ZenlessRankType from "@/common/types/dto/Zenless/RankType"
import TargetRankTypesEnum from "@/common/types/TargetRankTypesEnum"
import PullElement from "../PullElement"

interface PullsWrapperListProps<RankType extends GenshinRankType | ZenlessRankType | StarrailRankType> {
    pulls: PullEntity[]
    rankTypes: TargetRankTypesEnum<RankType>
}
export default function PullsWrapperList<RankType extends GenshinRankType | ZenlessRankType | StarrailRankType>(props: PullsWrapperListProps<RankType>) {
    return <div className="flex flex-col w-full gap-[4px]">
        {props.pulls.map(pull => <PullElement pull={pull} rankTypes={props.rankTypes}/>)}
    </div>
}