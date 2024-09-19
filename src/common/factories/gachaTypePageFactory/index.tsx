"use client"
import TargetGachaTypeEnum from "@/common/types/TargetGachaTypesEnum"
import { useLiveQuery } from "dexie-react-hooks"
import { notFound, useParams } from "next/navigation"
import { MainPageArgs } from "../mainPageFactory"
import Section from "@/components/Section"
import PullsWrapperList from "@/components/PullsWrapperList"
import StatisticsWrapperGrid from "@/components/StatisticsWrapperGrid"
import NoDataPlaceholder from "@/components/NoDataPlaceholder"
import GachaTypeUnion from "@/common/types/GachaTypeUnion"
import RankTypeUnion from "@/common/types/RankTypeUnion"
interface GachaTypeFactoryArgs<GachaType extends GachaTypeUnion, RankType extends RankTypeUnion> extends Pick<MainPageArgs<GachaType, RankType>, "dbInstance" | "gachaTypes" | "rankTypes"> {}
export default function gachaTypePageFactory<GachaType extends GachaTypeUnion, RankType extends RankTypeUnion>(args: GachaTypeFactoryArgs<GachaType, RankType>) {
    const GachaTypePage = function() {
        const { gachaType } = useParams()
        console.log(gachaType)
        const gachaTypeAsAKey = gachaType.toString().toUpperCase()
        if (!Object.keys(args.gachaTypes).includes(gachaTypeAsAKey)) {
            notFound()
        }
        const uid = "12-3812-83"
        const gachaTypeNumber = args.gachaTypes[gachaTypeAsAKey as keyof TargetGachaTypeEnum<GachaType>]
        console.log(gachaTypeNumber)
        const currentBannerPulls = useLiveQuery(() => args.dbInstance.pulls.where(["uid", "gachaType"]).equals([uid, gachaTypeNumber]).reverse().sortBy("time"))
        const currentBannerStats = useLiveQuery(() => args.dbInstance.stats.get({
            uid: uid,
            gachaType: gachaTypeNumber
        }))
        return <>
            <Section label="Stats">
                {currentBannerStats ? <StatisticsWrapperGrid statistics={currentBannerStats}/> : <NoDataPlaceholder/>}
            </Section>
            <Section label="Pulls">
                {currentBannerPulls ? <PullsWrapperList pulls={currentBannerPulls} rankTypes={args.rankTypes}/> : <NoDataPlaceholder/>}
            </Section>
        </>
    }
    return GachaTypePage
}