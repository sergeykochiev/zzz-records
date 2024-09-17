import GenshinRankType from "@/common/types/dto/Genshin/RankType"
interface StatElementProps {
    label: string
    value: string | number | boolean
    type?: keyof typeof GenshinRankType
}
export default function StatElement(props: StatElementProps) {
    const conditionalClassname = !props.type || props.type == "COMMON" ? "text-hwh-white-text-dark" : props.type == "EPIC" ? "text-hwh-epic-dark" : "text-hwh-legendary-dark"
    return <div className="px-[20px] py-[16px] flex justify-between items-center text-hwh-body-text-dark font-normal text-[16px]">
        {props.label}
        <div className={`text-[20px] font-bold ${conditionalClassname}`}>
            {Boolean(props.value) || props.value || "-"}
        </div>
    </div>
}