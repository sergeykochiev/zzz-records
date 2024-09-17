import GameAccountEntity from "@/common/database/entities/GameAccount";
import PullEntity from "@/common/database/entities/Pull";
import GenshinPullEntity from "@/common/database/Genshin/Pull";
import GenshinStatEntity from "@/common/database/Genshin/Stat";
import StarrailPullEntity from "@/common/database/Starrail/Pull";
import StarrailStatEntity from "@/common/database/Starrail/Stat";
import ZenlessPullEntity from "@/common/database/Zenless/Pull";
import ZenlessStatEntity from "@/common/database/Zenless/Stat";
import Games from "@/common/enum/Games";
import GenshinGachaType from "@/common/types/dto/Genshin/GachaType";
import GenshinRankType from "@/common/types/dto/Genshin/RankType";
import StarrailGachaType from "@/common/types/dto/Starrail/GachaType";
import StarrailRankType from "@/common/types/dto/Starrail/RankType";
import ZenlessGachaType from "@/common/types/dto/Zenless/GachaType";
import ZenlessRankType from "@/common/types/dto/Zenless/RankType";
import Dexie, { EntityTable } from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import PullListHeading from "../../../components/PullListHeading";
import PullsList from "../../../components/PullList";
import StatEntity from "@/common/database/entities/Stat";
import NoDataPlaceholder from "@/components/NoDataPlaceholder";
import H2 from "@/components/HeadingSecond";
import NavBarWrapper from "@/components/NavBarWrapper";
import Tab from "@/components/Tab";
import TargetGachaType from "@/common/types/TargetGachaType";
import TargetGachaTypeEnum from "@/common/types/TargetGachaType";
import GachaTypeNavBar from "@/components/GachaTypeNavBar";
import Section from "@/components/Section";
export interface MainPageArgs<GachaType extends GenshinGachaType | StarrailGachaType | ZenlessGachaType, RankType extends GenshinRankType | ZenlessRankType | StarrailRankType> {
    game: Games
    dbInstance: Dexie & {
        pulls: EntityTable<PullEntity & {
            gachaType: GachaType,
            rankType: RankType
        }, "id">
        gameaccs: EntityTable<GameAccountEntity, "id">;
        stats: EntityTable<StatEntity & {
            gachaType: GachaType
        }>
    }
    gachaTypes: TargetGachaTypeEnum<GachaType>,
    rankTypes: Record<keyof typeof GenshinRankType, RankType>
}
export default function mainPageFactory<GachaType extends GenshinGachaType | StarrailGachaType | ZenlessGachaType, RankType extends GenshinRankType | ZenlessRankType | StarrailRankType>(args: MainPageArgs<GachaType, RankType>) {
    const MainPage = function({ children }: { children: React.ReactNode }) {
        const [trigger, setTrigger] = useState<boolean>(false)
        const [input, setInput] = useState<string>("")
        const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true)
        const uid = "1500382653"
        // const getBanners = () => {
        //     const bannerPulls: Partial<Record<GachaType, PullEntity[]>> = {}
        //     for (let gachatype of Object.entries(args.gachaTypes)) {
        //         const [key, value] = gachatype
        //         if(!+key) continue
        //         bannerPulls[value] = (useLiveQuery(() => args.dbInstance.pulls.where(["uid","gacha_type"]).equals([uid, value]).reverse().sortBy("time")))!
        //     }
        //     return bannerPulls
        // }
        useEffect(() => {
            if (isInitialLoad) {
                setIsInitialLoad(false)
                return
            }
        }, [trigger])
        // const bannerPulls = getBanners()
        return <>
            <Section label="Fetch pulls">
                <div className="flex gap-[8px]">
                    <Input game={args.game} value={input} onChange={e => setInput(e.target.value)} placeholder="URL from cache..." name="authkey"/>
                    <Button game={args.game} onClick={() => setTrigger(!trigger)}>Fetch</Button>
                </div>
            </Section>
            <GachaTypeNavBar gachaTypes={args.gachaTypes}/>
            {children}
        </>
    }
    return MainPage
}