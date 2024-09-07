import HoyoPull from "@/common/types/dto/Hoyoverse/HoyoPull"
import GameUniqueComponentProps from "@/common/types/GameUniqueComponentProps"
import { useState } from "react"
interface PullComponentProps extends GameUniqueComponentProps {
    pull: HoyoPull
}
export default function PullComponent({ pull, kind }: PullComponentProps) {
    const [opened, setOpened] = useState<boolean>(false)
    return <div className={`select-none w-full flex flex-col ${opened && "bg-slate-400 shadow"} rounded-[22px] p-[2px]`}>
        <div onClick={() => setOpened(!opened)} className={`cursor-pointer transition-all ${pull.rank_type == "2" && "bg-slate-200"} ${pull.rank_type == "3" && "bg-purple-200"} ${pull.rank_type == "4" && "bg-orange-200"} grid grid-cols-[2fr,1fr,1fr] whitespace-nowrap py-[8px] px-[16px] rounded-[20px] place-items-center gap-[8px]`}>
            <div className="place-self-start font-bold">{pull.name}</div>
            <div>{pull.item_type}</div>
            <div className="place-self-end">{pull.time}</div>
        </div>
        {opened && <div className="grid p-[8px] text-white px-[16px] grid-cols-2 gap-[8px] items-start">
            item_id
            <div>{pull.item_id}</div>
            gacha_type
            <div>{pull.gacha_type}</div>
            id
            <div>{pull.id}</div>
            rank_type
            <div>{pull.rank_type}</div>
            uid
            <div>{pull.uid}</div>
        </div>}
    </div>
}