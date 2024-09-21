import StatEntity from "@/common/database/entities/Stat"
import GenshinRankType from "@/common/types/Genshin/RankType"
import { StatsToDisplay } from "../StatisticsWrapperGrid"
interface StatElementProps {
    label: string
    value: StatsToDisplay[keyof StatsToDisplay]
    type?: keyof typeof GenshinRankType
}
export default function StatElement(props: StatElementProps) {
    const conditionalClassname = !props.type || props.type == "COMMON" ? "text-hwh-white-text-dark" : props.type == "EPIC" ? "text-hwh-epic-dark" : "text-hwh-legendary-dark"
    return <div className="px-[20px] py-[16px] bg-hwh-element-dark rounded-[8px] flex justify-between items-center text-hwh-body-text-dark font-normal text-[16px]">
        {props.label}
        <div className={`text-[20px] font-bold ${conditionalClassname}`}>
            {Math.round(Number(props.value)) || "-"}
        </div>
    </div>
}