"use client"
import GenshinGachaType from "@/common/types/dto/Genshin/GachaType"
import StarrailGachaType from "@/common/types/dto/Starrail/GachaType"
import ZenlessGachaType from "@/common/types/dto/Zenless/GachaType"
import TargetGachaTypeEnum from "@/common/types/TargetGachaTypesEnum"
import { useLiveQuery } from "dexie-react-hooks"
import { notFound, useParams } from "next/navigation"
import { MainPageArgs } from "../mainPageFactory"
import GenshinRankType from "@/common/types/dto/Genshin/RankType"
import ZenlessRankType from "@/common/types/dto/Zenless/RankType"
import StarrailRankType from "@/common/types/dto/Starrail/RankType"
import Section from "@/components/Section"
import StatEntity from "@/common/database/entities/Stat"
import StatElement from "@/components/StatElement"
import { GSP_NO_RETURNED_VALUE } from "next/dist/lib/constants"
import PullElement from "@/components/PullElement"
import PullsWrapperList from "@/components/PullsWrapperList"
import StatisticsWrapperGrid from "@/components/StatisticsWrapperGrid"

interface GachaTypeFactoryArgs<GachaType extends GenshinGachaType | StarrailGachaType | ZenlessGachaType, RankType extends GenshinRankType | ZenlessRankType | StarrailRankType> extends Omit<MainPageArgs<GachaType, RankType>, "game"> {}
export default function gachaTypePageFactory<GachaType extends GenshinGachaType | StarrailGachaType | ZenlessGachaType, RankType extends GenshinRankType | ZenlessRankType | StarrailRankType>(args: GachaTypeFactoryArgs<GachaType, RankType>) {
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
                {currentBannerStats ? <StatisticsWrapperGrid statistics={currentBannerStats}/> : "No stats"}
            </Section>
            <Section label="Pulls">
                {currentBannerPulls ? <PullsWrapperList pulls={currentBannerPulls} rankTypes={args.rankTypes}/> : "No pulls"}
            </Section>
        </>
    }
    return GachaTypePage
}