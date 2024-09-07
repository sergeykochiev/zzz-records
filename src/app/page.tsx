"use client"

import GameKinds from "@/common/types/Games"
import Input from "@/components/Input"
import { ReactNode, useEffect, useRef, useState } from "react"
import { db, Pull, Stat } from "./db"
import { useLiveQuery } from "dexie-react-hooks"
import Button from "@/components/Button"
import Tab from "@/components/Tab"
import PullComponent from "@/components/PullComponent"
const params = {
    "authkey_ver": 1,
    "sign_type": 2,
    "plat_type": 3,
    "lang": "en",
    "region": "prod_gf_eu",
    "game_biz": "nap_global",
    "size": 20,
    "real_gacha_type": 0,
    "authkey": "",
    "end_id": 0
}
enum gachatypes {
    standart = 1,
    event = 2,
    weapon = 3,
    bangboo = 5
}
const eventgachaTypes = [gachatypes.event, gachatypes.weapon]
const gachatypeslist: gachatypes[] = [1, 2, 3, 5] as const
const zzzapiurl = "https://public-operation-nap-sg.hoyoverse.com/common/gacha_record/api/getGachaLog"

function customUrlSearchParams(params: Record<string, any>) {
    let searchParams = ""
    for (let key of Object.keys(params)) {
        if (searchParams.length != 0) searchParams = searchParams + "&"
        searchParams = searchParams + `${key}=${params[key]}`
    }
    return searchParams
}











export default function Page() {
    const [trigger, setTrigger] = useState<boolean>(false)
    const [input, setInput] = useState<string>("")
    const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true)
    const uid = "1500382653"
    const [standartPulls, eventPulls, weaponPulls, bangbooPulls] = [
        useLiveQuery(() => db.pulls.where(["uid","gacha_type"]).equals([uid, String(gachatypes.standart)]).reverse().sortBy("time")),
        useLiveQuery(() => db.pulls.where(["uid","gacha_type"]).equals([uid, String(gachatypes.event)]).reverse().sortBy("time")),
        useLiveQuery(() => db.pulls.where(["uid","gacha_type"]).equals([uid, String(gachatypes.weapon)]).reverse().sortBy("time")),
        useLiveQuery(() => db.pulls.where(["uid","gacha_type"]).equals([uid, String(gachatypes.bangboo)]).reverse().sortBy("time"))
    ]
    useEffect(() => {
        if (isInitialLoad) {
            setIsInitialLoad(false)
            return
        }
        async function fetchData() {
            await fetchPulls(input)
        }
        fetchData()
    }, [trigger])

    return <main className="px-[128px] pb-[128px] flex flex-col gap-[64px] items-center bg-gray-100 min-h-screen">
        <div className="w-full py-[8px] flex items-center justify-between">
            <div className="grid place-items-center text-slate-700 text-[24px] font-black uppercase">ZZZ Records</div>
            <div className="flex items-center gap-[8px]">
                <Tab name="main-nav" kind={GameKinds.GENSHIN}>
                    Genshin Impact
                </Tab>
                <Tab name="main-nav" kind={GameKinds.STARRAIL}>
                    Honkai: Star Rail
                </Tab>
                <Tab name="main-nav" kind={GameKinds.ZENLESS}>
                    Zenless Zone Zero
                </Tab>
            </div>
        </div>
        <div className="text-black w-full rounded-[20px] bg-white outline outline-[1px] outline-slate-500 p-[32px] shadow-xl flex flex-col gap-[20px]">
            <h1 className="text-[20px] text-slate-800 px-[24px] font-black">Fetch pulls</h1>
            <div className="flex gap-[16px] items-stretch">
                <Input kind={GameKinds.GENSHIN} value={input} onChange={e => setInput(e.target.value)} placeholder="Enter your authkey" name="authkey"/>
                <Button kind={GameKinds.GENSHIN} onClick={() => setTrigger(!trigger)}>Fetch</Button>
            </div>
        </div>
        <div className="flex flex-col gap-[16px] w-full font-medium text-slate-700">
            <div className="grid grid-cols-4 w-full gap-[64px]">
                <PullListHeading>Standart</PullListHeading>
                <PullListHeading>Event</PullListHeading>
                <PullListHeading>Weapon</PullListHeading>
                <PullListHeading>Bangboo</PullListHeading>
            </div>
            <div className="grid grid-cols-4 w-full gap-[64px] place-items-start">
                {standartPulls && standartPulls.length ? <PullsList pulls={standartPulls}/> : <NoDataPlaceholder/>}
                {eventPulls && eventPulls.length ? <PullsList pulls={eventPulls}/> : <NoDataPlaceholder/>}
                {weaponPulls && weaponPulls.length ? <PullsList pulls={weaponPulls}/> : <NoDataPlaceholder/>}
                {bangbooPulls && bangbooPulls.length ? <PullsList pulls={bangbooPulls}/> : <NoDataPlaceholder/>}
            </div>
        </div>
    </main>
}