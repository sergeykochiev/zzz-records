import HoyoPull from "@/common/types/dto/Hoyoverse/HoyoPull";
import PullComponent from "../PullComponent";
import GameUniqueComponentProps from "@/common/types/GameUniqueComponentProps";
import GenshinRankType from "@/common/types/dto/Genshin/RankType";
import StarrailRankType from "@/common/types/dto/Starrail/RankType";
import ZenlessRankType from "@/common/types/dto/Zenless/RankType";
import PullEntity from "@/common/database/entities/Pull";
interface PullListProps extends GameUniqueComponentProps {
    pulls: PullEntity[]
    rankTypes: Record<keyof typeof GenshinRankType, GenshinRankType | StarrailRankType | ZenlessRankType>,
}
export default function PullsList({ pulls, game, rankTypes }: PullListProps) {
    return <div className="flex flex-col w-full gap-[4px] text-black">
        {pulls.map(pull => <PullComponent rankTypes={rankTypes} game={game} key={pull.id} pull={pull}/>)}
    </div>
}