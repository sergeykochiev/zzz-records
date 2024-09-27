"use client"
import TargetGachaTypeEnum from "@/common/types/targetGeneric/TargetGachaTypesEnum"
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
        const params = useParams()
        const currentGameAccount = params.gameAccount as string
        const gachaTypeAsAKey = gachaType.toString().toUpperCase()
        if (!Object.keys(args.gachaTypes).includes(gachaTypeAsAKey)) {
            notFound()
        }
        const gachaTypeNumber = args.gachaTypes[gachaTypeAsAKey as keyof TargetGachaTypeEnum<GachaType>]
        const currentBannerPulls = useLiveQuery(() => args.dbInstance.pulls.where(["uid", "gachaType"]).equals([currentGameAccount, gachaTypeNumber]).reverse().sortBy("time"))
        const currentBannerStats = useLiveQuery(() => args.dbInstance.stats.get({
            uid: currentGameAccount,
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