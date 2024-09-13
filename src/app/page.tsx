"use client"

import GameKinds from "@/common/enum/Games"
import Input from "@/components/Input"
import { ReactNode, useEffect, useRef, useState } from "react"
import { useLiveQuery } from "dexie-react-hooks"
import Button from "@/components/Button"
import Tab from "@/components/Tab"
import PullComponent from "@/components/PullComponent"
import ApiUrls from "@/common/types/api/getGachaLogRouteApiUrls"
import { db } from "./db"
import fetchPulls from "@/common/functions/fetchPulls"
import ZenlessGachaType from "@/common/types/dto/Zenless/GachaType"










export default function Page() {
    const [trigger, setTrigger] = useState<boolean>(false)
    const [input, setInput] = useState<string>("")
    const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true)
    const uid = "1500382653"
    const [standartPulls, eventPulls, weaponPulls, bangbooPulls] = [
        useLiveQuery(() => db.pulls.where(["uid","gacha_type"]).equals([uid, String(ZenlessGachaType.STANDART)]).reverse().sortBy("time")),
        useLiveQuery(() => db.pulls.where(["uid","gacha_type"]).equals([uid, String(ZenlessGachaType.STANDART)]).reverse().sortBy("time")),
        useLiveQuery(() => db.pulls.where(["uid","gacha_type"]).equals([uid, String(ZenlessGachaType.STANDART)]).reverse().sortBy("time")),
        useLiveQuery(() => db.pulls.where(["uid","gacha_type"]).equals([uid, String(ZenlessGachaType.STANDART)]).reverse().sortBy("time"))
    ]
    useEffect(() => {
        if (isInitialLoad) {
            setIsInitialLoad(false)
            return
        }
        async function fetchData() {
            await fetchPulls(ApiUrls.ZENLESS, new URLSearchParams(input), ZenlessGachaType)
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