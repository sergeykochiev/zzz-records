import GameAccountEntity from "@/common/database/entities/GameAccount";
import PullEntity from "@/common/database/entities/Pull";
import Games from "@/common/enum/Games";
import Dexie, { EntityTable } from "dexie";
import { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import StatEntity from "@/common/database/entities/Stat";
import TargetGachaTypeEnum from "@/common/types/TargetGachaTypesEnum";
import Section from "@/components/Section";
import GameAccountSelect from "@/components/GameAccountSelect";
import { useLiveQuery } from "dexie-react-hooks";
import GachaTypeUnion from "@/common/types/GachaTypeUnion";
import RankTypeUnion from "@/common/types/RankTypeUnion";
import TargetRankTypesEnum from "@/common/types/TargetRankTypesEnum";
import HoyoCachedUrlHandler from "@/common/HoyoCachedUrlHandler";
import GachaLogApiRouteUrls from "@/common/enum/GachaLogRouteApiUrls";
import HoyoApiClass from "@/common/api/Hoyoverse";
export interface MainPageArgs<GachaType extends GachaTypeUnion, RankType extends RankTypeUnion> {
    game: Games
    dbInstance: Dexie & {
        pulls: EntityTable<PullEntity<GachaType, RankType>, "id">
        gameaccs: EntityTable<GameAccountEntity, "id">;
        stats: EntityTable<StatEntity<GachaType>>
    }
    gachaTypes: TargetGachaTypeEnum<GachaType>,
    rankTypes: TargetRankTypesEnum<RankType>
    gachaTypeField: "real_gacha_type" | "gacha_type",
    apiUrl: GachaLogApiRouteUrls
}
export default function mainPageFactory<GachaType extends GachaTypeUnion, RankType extends RankTypeUnion>(args: MainPageArgs<GachaType, RankType>) {
    const urlInputName = "url"
    const MainPage = function({ children }: { children: React.ReactNode }) {
        const gameAccounts = useLiveQuery(() => args.dbInstance.gameaccs.toArray())
        const [input, setInput] = useState<string>("")
        const fetchAndSavePulls = async () => {
            // e.preventDefault()
            // const url = (new FormData(e.target as HTMLFormElement)).get(urlInputName)
            // if (!url) return
            const url = input
            const cachedUrlHandler = new HoyoCachedUrlHandler(url as string)
            const params = cachedUrlHandler.parseCachedUrlParams()
            const hoyoApi = new HoyoApiClass(
                console.log,
                params.authkey,
                "en",
                params.gameBiz,
                args.gachaTypeField,
                args.rankTypes,
                args.gachaTypes,
                args.apiUrl
            )
            try {
                const uid = await hoyoApi.getUid()
                if (!uid) {
                    console.log("Seems you didnt pull yet")
                    return
                }
                const [pulls, stats] = await hoyoApi.fetchPullsAndCalculateStats()
                for (let gachatype of Object.keys(pulls)) {
                    await args.dbInstance.gameaccs.add({
                        uid: uid
                    })
                    console.log(gachatype)
                    await args.dbInstance.pulls.bulkAdd(pulls[Number(gachatype) as GachaType])
                    await args.dbInstance.stats.add(stats[Number(gachatype) as GachaType])
                }
            } catch(e) {
                alert((e as Error).message)
            }
        }
        return <>
            <div className="flex">
                <Section label="Fetch pulls">
                    <div className="flex gap-[8px]">
                        <Input value={input} onChange={e => setInput(e.target.value)} game={args.game} placeholder="URL from cache..." name={urlInputName}/>
                        <Button game={args.game} onClick={fetchAndSavePulls}>Fetch</Button>
                    </div>
                </Section>
                <Section label="Choose an account">
                    <GameAccountSelect gameAccounts={gameAccounts}/>
                </Section>
            </div>
            {children}
        </>
    }
    return MainPage
}