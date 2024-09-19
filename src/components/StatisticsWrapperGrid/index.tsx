import StatEntity from "@/common/database/entities/Stat"
import StatElement from "../StatElement"
import GachaTypeUnion from "@/common/types/GachaTypeUnion"
export type StatsToDisplay = Omit<StatEntity<GachaTypeUnion>, "gachaType" | "uid">
const UserReadableStatNames: Record<keyof StatsToDisplay, string> = {
    avgEpicPity: "Average epic pity",
    avgLegendaryPity: "Average legendary pity",
    count: "Pull count",
    countEpic: "Epic count",
    countLegendary: "Legendary count",
    currentEpicPity: "Current epic pity",
    currentLegendaryPity: "Current legendary pity",
    nextEpicIsUp: "Next epic is event",
    nextLegendaryIsUp: "Next legendary is event"
}
interface StatisticsWrapperGridProps {
    statistics: StatEntity<GachaTypeUnion>
}
export default function StatisticsWrapperGrid(props: StatisticsWrapperGridProps) {
    return <div className="grid grid-cols-5 gap-[4px]">
        {Object.keys(UserReadableStatNames).map(key => {
            if (key in ["gachaType", "uid"]) return
            return <StatElement label={UserReadableStatNames[key as keyof StatsToDisplay]} value={props.statistics[key as keyof StatsToDisplay]}/>
        })}
        {<StatElement label="Gem count" value={props.statistics.count*160}/>}
    </div>
}