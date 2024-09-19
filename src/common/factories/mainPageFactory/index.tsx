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
import HoyoApiFetcherClass from "@/common/api/Hoyoverse";
import HoyoCachedUrlHandler from "@/common/HoyoCachedUrlHandler";
import GachaLogApiRouteUrls from "@/common/enum/GachaLogRouteApiUrls";
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
    const MainPage = function({ children }: { children: React.ReactNode }) {
        const [input, setInput] = useState<string>("")
        const gameAccounts = useLiveQuery(() => args.dbInstance.gameaccs.toArray())
        const fetchAndSavePulls = async () => {
            const cachedUrlHandler = new HoyoCachedUrlHandler(input)
            const params = cachedUrlHandler.parseCachedUrlParams()
            const apiFetcher = new HoyoApiFetcherClass(
                params.authkey,
                params.lang,
                params.gameBiz,
                args.gachaTypeField,
                args.rankTypes,
                args.gachaTypes,
                args.apiUrl
            )
            const [pulls, stats] = await apiFetcher.fetchPulls()
            for (let gachatype in pulls) {
                await args.dbInstance.pulls.bulkAdd(pulls[gachatype])
                await args.dbInstance.stats.add(stats[gachatype])
            }
        }
        return <>
            <div className="grid grid-cols-2 w-full gap-[16px]">
                <Section label="Fetch pulls">
                    <div className="flex gap-[8px]">
                        <Input game={args.game} value={input} onChange={e => setInput(e.target.value)} placeholder="URL from cache..." name="authkey"/>
                        <Button game={args.game} onClick={fetchAndSavePulls}>Fetch</Button>
                    </div>
                </Section>
                <GameAccountSelect gameAccounts={gameAccounts}/>
            </div>
            {children}
        </>
    }
    return MainPage
}