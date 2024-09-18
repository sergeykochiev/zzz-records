import PullEntity from "@/common/database/entities/Pull"
import GenshinRankType from "@/common/types/dto/Genshin/RankType"
import StarrailRankType from "@/common/types/dto/Starrail/RankType"
import ZenlessRankType from "@/common/types/dto/Zenless/RankType"
import TargetRankTypesEnum from "@/common/types/TargetRankTypesEnum"
interface PullElementProps<RankType> {
    pull: PullEntity
    rankTypes: TargetRankTypesEnum<RankType>
}
export default function PullElement<RankType extends GenshinRankType | StarrailRankType | ZenlessRankType>(props: PullElementProps<RankType>) {
    const conditionalClassname = props.pull.rankType == props.rankTypes.LEGENDARY ? "bg-hwh-element-legendary-dark" : props.pull.rankType == props.rankTypes.EPIC ? "bg-hwh-element-epic-dark" : "bg-hwh-"
    return <div className={`select-none w-full cursor-pointer text-hwh-body-text-dark transition-all grid grid-cols-5 whitespace-nowrap py-[4px] rounded-[8px] place-items-center ${conditionalClassname}`}>
        <div>{props.pull.name}</div>
        <div>{props.pull.time}</div>
        <div>{props.pull.itemType}</div>
        <div>{props.pull.rankType}</div>
        <div>{props.pull.pity}</div>
    </div>
}