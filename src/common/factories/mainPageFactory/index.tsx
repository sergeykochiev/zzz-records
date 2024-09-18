import GameAccountEntity from "@/common/database/entities/GameAccount";
import PullEntity from "@/common/database/entities/Pull";
import Games from "@/common/enum/Games";
import GenshinGachaType from "@/common/types/dto/Genshin/GachaType";
import GenshinRankType from "@/common/types/dto/Genshin/RankType";
import StarrailGachaType from "@/common/types/dto/Starrail/GachaType";
import StarrailRankType from "@/common/types/dto/Starrail/RankType";
import ZenlessGachaType from "@/common/types/dto/Zenless/GachaType";
import ZenlessRankType from "@/common/types/dto/Zenless/RankType";
import Dexie, { EntityTable } from "dexie";
import { useEffect, useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import StatEntity from "@/common/database/entities/Stat";
import TargetGachaTypeEnum from "@/common/types/TargetGachaTypesEnum";
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
        useEffect(() => {
            if (isInitialLoad) {
                setIsInitialLoad(false)
                return
            }
        }, [trigger])
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