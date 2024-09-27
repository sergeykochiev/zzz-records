import StatEntity from "@/common/database/entities/Stat"
import StatElement from "../StatElement"
import GachaTypeUnion from "@/common/types/union/GachaTypeUnion"
export type StatsToDisplay = Omit<StatEntity<GachaTypeUnion>, "gachaType" | "uid">
const UserReadableStatNames: Record<keyof StatsToDisplay, string> = {
    currentLegendaryPity: "Current legendary pity",
    nextLegendaryIsUp: "Next legendary is event",
    avgLegendaryPity: "Average legendary pity",
    countLegendary: "Legendary count",
    count: "Pull count",
    currentEpicPity: "Current epic pity",
    nextEpicIsUp: "Next epic is event",
    avgEpicPity: "Average epic pity",
    countEpic: "Epic count",
}
interface StatisticsWrapperGridProps {
    statistics: StatEntity<GachaTypeUnion>
}
export default function StatisticsWrapperGrid(props: StatisticsWrapperGridProps) {
    return <div className="grid grid-cols-5 gap-[4px]">
        {Object.keys(UserReadableStatNames).map(key => {
            if (key in ["gachaType", "uid"]) return
            return <StatElement key={key} label={UserReadableStatNames[key as keyof StatsToDisplay]} value={props.statistics[key as keyof StatsToDisplay]}/>
        })}
        {<StatElement label="Gem count" value={props.statistics.count*160}/>}
    </div>
}