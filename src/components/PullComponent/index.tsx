import PullEntity from "@/common/database/entities/Pull"
import GenshinRankType from "@/common/types/dto/Genshin/RankType"
import HoyoPull from "@/common/types/dto/Hoyoverse/HoyoPull"
import StarrailRankType from "@/common/types/dto/Starrail/RankType"
import ZenlessRankType from "@/common/types/dto/Zenless/RankType"
import GameUniqueComponentProps from "@/common/types/GameUniqueComponentProps"
import { useState } from "react"
interface PullComponentProps extends GameUniqueComponentProps {
    pull: PullEntity
    rankTypes: Record<keyof typeof GenshinRankType, GenshinRankType | StarrailRankType | ZenlessRankType>,
}
export default function PullComponent({ pull, game, rankTypes }: PullComponentProps) {
    const [opened, setOpened] = useState<boolean>(false)
    return <div className={`select-none w-full flex flex-col ${opened && "bg-slate-400 shadow"} rounded-[22px] p-[2px]`}>
        <div onClick={() => setOpened(!opened)} className={`cursor-pointer transition-all ${pull.rankType == rankTypes.COMMON && "bg-slate-200"} ${pull.rankType == rankTypes.EPIC && "bg-purple-200"} ${pull.rankType == rankTypes.LEGENDARY && "bg-orange-200"} grid grid-cols-[2fr,1fr,1fr] whitespace-nowrap py-[8px] px-[16px] rounded-[20px] place-items-center gap-[8px]`}>
            <div className="place-self-start font-bold">{pull.name}</div>
            <div>{pull.itemType}</div>
            <div className="place-self-end">{pull.time}</div>
        </div>
        {opened && <div className="grid p-[8px] text-white px-[16px] grid-cols-2 gap-[8px] items-start">
            item_id
            <div>{pull.itemId}</div>
            gacha_type
            <div>{pull.gachaType}</div>
            id
            <div>{pull.id}</div>
            rank_type
            <div>{pull.rankType}</div>
            uid
            <div>{pull.uid}</div>
        </div>}
    </div>
}