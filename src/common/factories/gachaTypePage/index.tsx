"use client"
import PullEntity from "@/common/database/entities/Pull"
import GenshinGachaType from "@/common/types/dto/Genshin/GachaType"
import StarrailGachaType from "@/common/types/dto/Starrail/GachaType"
import ZenlessGachaType from "@/common/types/dto/Zenless/GachaType"
import TargetGachaTypeEnum from "@/common/types/TargetGachaType"
import { Dexie, EntityTable } from "dexie"
import { useLiveQuery } from "dexie-react-hooks"
import { notFound, useParams } from "next/navigation"
import { MainPageArgs } from "../mainPageFactory"
import GenshinRankType from "@/common/types/dto/Genshin/RankType"
import ZenlessRankType from "@/common/types/dto/Zenless/RankType"
import StarrailRankType from "@/common/types/dto/Starrail/RankType"
import Section from "@/components/Section"
import StatEntity from "@/common/database/entities/Stat"
import StatElement from "@/components/StatElement"
import { useEffect, useState } from "react"
import { GSP_NO_RETURNED_VALUE } from "next/dist/lib/constants"
import PullComponent from "@/components/PullComponent"
import PullElement from "@/components/PullComponent"
type StatsToDisplay = keyof Omit<StatEntity, "gachaType" | "uid">
const UserReadableStatNames: Record<StatsToDisplay, string> = {
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
interface GachaTypeFactoryArgs<GachaType extends GenshinGachaType | StarrailGachaType | ZenlessGachaType, RankType extends GenshinRankType | ZenlessRankType | StarrailRankType> extends Omit<MainPageArgs<GachaType, RankType>, "game"> {}
export default function gachaTypePageFactory<GachaType extends GenshinGachaType | StarrailGachaType | ZenlessGachaType, RankType extends GenshinRankType | ZenlessRankType | StarrailRankType>(args: GachaTypeFactoryArgs<GachaType, RankType>) {
    const GachaTypePage = function() {
        const { gachaType } = useParams()
        console.log(gachaType)
        if (!Object.keys(args.gachaTypes).includes(gachaType.toString().toUpperCase())) {
            notFound()
        }
        const uid = "12-3812-83"
        const currentBannerPulls = useLiveQuery(() => args.dbInstance.pulls.where(["uid", "gachaType"]).equals([uid, args.gachaTypes[gachaType as keyof TargetGachaTypeEnum<GachaType>]]).reverse().sortBy("time"))
        const currentBannerStats = useLiveQuery(() => args.dbInstance.stats.get({
            uid: uid,
            gachaType: args.gachaTypes[gachaType as keyof TargetGachaTypeEnum<GachaType>]
        }))
        return <>
            <Section label="Stats">
                {currentBannerStats ? Object.keys(currentBannerStats).map(key => {
                    if (key in ["gachaType", "uid"]) GSP_NO_RETURNED_VALUE
                    return <StatElement label={UserReadableStatNames[key as StatsToDisplay]} value={currentBannerStats![key as StatsToDisplay]}/>
                }) : "No stats"}
            </Section>
            <Section label="Pulls">
                {currentBannerPulls ? currentBannerPulls.map(pull => {
                    return <PullElement pull={pull} rankTypes={args.rankTypes}/>
                }) : "No pulls"}
            </Section>
        </>
    }
    return GachaTypePage
}