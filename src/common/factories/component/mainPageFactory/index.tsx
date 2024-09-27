import Games from "@/common/enum/Games";
import { useRef, useState } from "react";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import TargetGachaTypeEnum from "@/common/types/targetGeneric/TargetGachaTypesEnum";
import Section from "@/components/Section";
import GameAccountSelect from "@/components/GameAccountSelect";
import { useLiveQuery } from "dexie-react-hooks";
import GachaTypeUnion from "@/common/types/union/GachaTypeUnion";
import RankTypeUnion from "@/common/types/union/RankTypeUnion";
import TargetRankTypesEnum from "@/common/types/targetGeneric/TargetRankTypesEnum";
import HoyoCachedUrlHandler from "@/common/HoyoCachedUrlHandler";
import DexieDBHelperClass from "@/common/database/DexieDBHelperClass";
import TargetDexieDBInstance from "@/common/types/targetGeneric/TargetDexieDBInstance";
import ElementLogger from "../../function/ElementLogger";
import HoyoApiRouteProvider from "@/common/api/routes/HoyoApiRouteProvider";
import HoyoApi from "@/common/api/Hoyoverse/HoyoApi";
import HoyoWishHistoryFetcher from "@/common/HoyoWishHistoryFetcher";
import GenshinStandartCharacters from "@/common/types/game/Genshin/StandartCharacters";
import TargetStandartCharactersEnum from "@/common/types/targetGeneric/TargetStandartCharactersEnum";
import StandartCharactersUnion from "@/common/types/union/StandartCharactersUnion";
import GenshinGachaTypeField from "@/common/types/game/Genshin/GachaTypeField";
import GachaTypeFieldUnion from "@/common/types/union/GachaTypeFIeldUnion";
export interface MainPageArgs<GachaType extends GachaTypeUnion, RankType extends RankTypeUnion, StandartCharacters extends StandartCharactersUnion> {
    game: Games
    dbInstance: TargetDexieDBInstance<any, GachaType, RankType>
    gachaTypes: TargetGachaTypeEnum<GachaType>,
    rankTypes: TargetRankTypesEnum<RankType>,
    standartCharacters: TargetStandartCharactersEnum<StandartCharacters>
    gachaTypeField: GachaTypeFieldUnion
}
export default function mainPageFactory<GachaType extends GachaTypeUnion, RankType extends RankTypeUnion, StandartCharacters extends StandartCharactersUnion>(args: MainPageArgs<GachaType, RankType, StandartCharacters>) {
    const urlInputName = "url"
    const MainPage = function({ children }: { children: React.ReactNode }) {
        const dbHelper = new DexieDBHelperClass(args.dbInstance, args.gachaTypes)
        const gameAccounts = useLiveQuery(() => dbHelper.syncGetAllGameAccounts())
        const loggerElementRef = useRef<HTMLDivElement | null>(null)
        const hoyoApiRouteProvider = new HoyoApiRouteProvider(args.game)
        const hoyoApi = new HoyoApi(hoyoApiRouteProvider)
        const [input, setInput] = useState<string>("")
        console.log(GenshinStandartCharacters)
        const fetchAndSavePulls = async () => {
            // e.preventDefault()
            // const url = (new FormData(e.target as HTMLFormElement)).get(urlInputName)
            // if (!url) return
            const url = input
            const cachedUrlHandler = new HoyoCachedUrlHandler(url as string)
            const params = cachedUrlHandler.parseCachedUrlParams()
            const hoyoWishHistory = new HoyoWishHistoryFetcher<any, GachaType, RankType, StandartCharacters>(
                ElementLogger(loggerElementRef),
                params.authkey,
                "en",
                params.gameBiz,
                args.gachaTypeField,
                args.rankTypes,
                args.gachaTypes,
                args.standartCharacters,
                hoyoApi,
            )
            try {
                const uid = await hoyoWishHistory.getUid()
                if (!uid) {
                    console.log("Seems you didnt pull yet")
                    return
                }
                const endIds = await dbHelper.getEndIds(uid)
                const [pulls, stats] = await hoyoWishHistory.fetchPullsAndCalculateStats(endIds)
                await dbHelper.saveGameAccount({
                    uid: uid,
                    region: params.gameBiz,
                    name: "Account"
                })
                for (let key of Object.keys(pulls)) {
                    await dbHelper.saveManyPulls(pulls[+key as GachaType])
                    await dbHelper.saveStat(stats[+key as GachaType])
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
                    <div className="text-hwh-body-text-dark" ref={loggerElementRef}></div>
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