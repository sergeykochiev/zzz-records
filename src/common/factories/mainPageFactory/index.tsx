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
interface MainPageProps<GachaType extends GenshinGachaType | StarrailGachaType | ZenlessGachaType, RankType extends GenshinRankType | ZenlessRankType | StarrailRankType> {
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
    gachaTypes: Record<keyof typeof GenshinGachaType, GachaType> | Record<keyof typeof ZenlessGachaType, GachaType> | Record<keyof typeof StarrailGachaType, GachaType>,
    rankTypes: Record<keyof typeof GenshinRankType, RankType>
}
export default function mainPageFactory<GachaType extends GenshinGachaType | StarrailGachaType | ZenlessGachaType, RankType extends GenshinRankType | ZenlessRankType | StarrailRankType>(props: MainPageProps<GachaType, RankType>) {
    const MainPage = function() {
        const [trigger, setTrigger] = useState<boolean>(false)
        const [input, setInput] = useState<string>("")
        const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true)
        const uid = "1500382653"
        const getBanners = () => {
            const bannerPulls: Partial<Record<  GachaType, PullEntity[]>> = {}
            for (let gachatype of Object.entries(props.gachaTypes)) {
                const [key, value] = gachatype
                if(!+key) continue
                console.log(gachatype)
                console.log(value)
                console.log(key, value)
                bannerPulls[value] = (useLiveQuery(() => props.dbInstance.pulls.where(["uid","gacha_type"]).equals([uid, value]).reverse().sortBy("time")))!
            }
            return bannerPulls
        }
        useEffect(() => {
            if (isInitialLoad) {
                setIsInitialLoad(false)
                return
            }
        }, [trigger])
        const bannerPulls = getBanners()
        return <main className="px-[128px] py-[128px] flex flex-col gap-[64px]  items-center bg-gray-100 min-h-screen">
            <div className="text-black w-full rounded-[20px] bg-white p-[32px] shadow-xl flex flex-col gap-[20px]">
                <h1 className="text-[20px] text-slate-800 px-[24px] font-black">Fetch pulls</h1>
                <div className="flex gap-[16px] items-stretch">
                    <Input game={props.game} value={input} onChange={e => setInput(e.target.value)} placeholder="Enter your authkey" name="authkey"/>
                    <Button game={props.game} onClick={() => setTrigger(!trigger)}>Fetch</Button>
                </div>
            </div>
            <div className="flex gap-[16px] w-full font-medium text-slate-700">
                {
                    Object.keys(bannerPulls).map(key => {
                        const currentPulls = bannerPulls[key]!
                        return <div className="flex flex-col gap-[16px]">
                            <PullListHeading>{key}</PullListHeading>
                            {currentPulls ? <PullsList pulls={currentPulls} rankTypes={props.rankTypes} game={props.game}/> : <NoDataPlaceholder/>}
                        </div>
                    })
                }
            </div>
        </main>
    }
    return MainPage
}