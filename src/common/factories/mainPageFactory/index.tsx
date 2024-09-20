import Games from "@/common/enum/Games";
import { useRef, useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
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
import DexieDBHelperClass from "@/common/database/DexieDBHelperClass";
import TargetDexieDBInstance from "@/common/types/TargetDexieDBInstance";
import ElementLogger from "../ElementLogger";
export interface MainPageArgs<GachaType extends GachaTypeUnion, RankType extends RankTypeUnion> {
    game: Games
    dbInstance: TargetDexieDBInstance<GachaType, RankType>
    gachaTypes: TargetGachaTypeEnum<GachaType>,
    rankTypes: TargetRankTypesEnum<RankType>
    gachaTypeField: "real_gacha_type" | "gacha_type",
    apiUrl: GachaLogApiRouteUrls
}
export default function mainPageFactory<GachaType extends GachaTypeUnion, RankType extends RankTypeUnion>(args: MainPageArgs<GachaType, RankType>) {
    const urlInputName = "url"
    const MainPage = function({ children }: { children: React.ReactNode }) {
        const dbHelper = new DexieDBHelperClass(args.dbInstance, args.gachaTypes)
        const gameAccounts = useLiveQuery(() => dbHelper.syncGetAllGameAccounts())
        const loggerElementRef = useRef<HTMLDivElement | null>(null)
        const [input, setInput] = useState<string>("")
        const fetchAndSavePulls = async () => {
            // e.preventDefault()
            // const url = (new FormData(e.target as HTMLFormElement)).get(urlInputName)
            // if (!url) return
            const url = input
            const cachedUrlHandler = new HoyoCachedUrlHandler(url as string)
            const params = cachedUrlHandler.parseCachedUrlParams()
            const hoyoApi = new HoyoApiClass(
                ElementLogger(loggerElementRef),
                params.authkey,
                "en",
                params.gameBiz,
                args.gachaTypeField,
                args.rankTypes,
                args.gachaTypes,
                args.apiUrl,
            )
            try {
                const uid = await hoyoApi.getUid()
                if (!uid) {
                    console.log("Seems you didnt pull yet")
                    return
                }
                const endIds = await dbHelper.getEndIds(uid)
                const [pulls, stats] = await hoyoApi.fetchPullsAndCalculateStats(endIds)
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