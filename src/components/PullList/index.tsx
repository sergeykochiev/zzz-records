import HoyoPull from "@/common/types/dto/Hoyoverse/HoyoPull";
import PullComponent from "../PullComponent";
import GameUniqueComponentProps from "@/common/types/GameUniqueComponentProps";
interface PullListProps extends GameUniqueComponentProps {
    pulls: HoyoPull[]
}
export default function PullsList({ pulls, kind }: PullListProps) {
    return <div className="flex flex-col w-full gap-[4px] text-black">
        {pulls.map(pull => <PullComponent kind={kind} key={pull.id} pull={pull}/>)}
    </div>
}