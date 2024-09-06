"use client"

import GameKinds from "@/common/types/Games"
import Input from "@/components/Input"
import { ReactNode, useEffect, useRef, useState } from "react"
import { db, Pull, Stat } from "./db"
import { useLiveQuery } from "dexie-react-hooks"
import Button from "@/components/Button"
import Tab from "@/components/Tab"
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

function getUrl(params: Record<string, any>) {
    return `${zzzapiurl}?${customUrlSearchParams(params)}`
}

async function fetchBanner(params: Record<string, any>, pulls: Pull[] = [], stats: Stat = {
    uid: "",
    gacha_type: params.real_gacha_type,
    count: 0,
    countA: 0,
    countS: 0,
    currentAPity: 0,
    currentSPity: 0,
    nextAIsUp: false,
    nextSIsUp: false,
    avgAPity: 0,
    avgSPity: 0,
}, helpers = {
    foundAPity: false,
    foundSPity: false,
    lastAIdx: -1,
    lastSIdx: -1,
}): Promise<[Pull[], Stat] | void> {
    const url = getUrl(params)
    const res = await fetch(url)
    if (!res.ok) {
        console.log(`fetch error ${res.status}: ${res.statusText}`)
        return
    }
    const json: HoyoResponse = await res.json()
    if (json.retcode != 0) {
        console.log(`retcode error ${json.retcode}: ${json.message}`)
        return
    }
    if (json.data.list.length == 0) {
        params.end_id = 0
        if (helpers.lastAIdx >= 0) stats.avgAPity += pulls[helpers.lastAIdx].pity
        if (helpers.lastSIdx >= 0) stats.avgSPity += pulls[helpers.lastSIdx].pity
        stats.avgAPity /= stats.countA
        stats.avgSPity /= stats.countS
        return [pulls, stats]
    }
    for (const pull of json.data.list) {
        const newPull: Pull = {
            uid: pull.uid,
            gacha_type: pull.gacha_type,
            item_id: pull.item_id,
            time: pull.time,
            name: pull.name,
            item_type: pull.item_type,
            rank_type: pull.rank_type,
            id: pull.id,
            pity: 0
        }
        if (!stats.uid) stats.uid = pull.uid
        // if (eventgachaTypes.includes(stats.gacha_type)) {}
        stats.count += 1
        if (pull.rank_type == "3") {
            stats.countA += 1
            if (!helpers.foundAPity) helpers.foundAPity = true
            if (!helpers.foundSPity) stats.currentSPity += 1
            if (helpers.lastAIdx >= 0) {
                pulls[helpers.lastAIdx].pity += 1
                stats.avgAPity += pulls[helpers.lastAIdx].pity
            }
            if (helpers.lastSIdx >= 0) pulls[helpers.lastSIdx].pity += 1
            helpers.lastAIdx = pulls.length
        } else if (pull.rank_type == "4") {
            stats.countS += 1
            if (!helpers.foundSPity) helpers.foundSPity = true
            if (!helpers.foundAPity) stats.currentAPity += 1
            if (helpers.lastAIdx >= 0) pulls[helpers.lastAIdx].pity += 1
            if (helpers.lastSIdx >= 0) {
                pulls[helpers.lastSIdx].pity += 1
                stats.avgSPity += pulls[helpers.lastSIdx].pity
            }
            helpers.lastSIdx = pulls.length
        } else {
            if (!helpers.foundAPity) stats.currentAPity += 1
            if (!helpers.foundSPity) stats.currentSPity += 1
            if (helpers.lastAIdx >= 0) pulls[helpers.lastAIdx].pity += 1
            if (helpers.lastSIdx >= 0) pulls[helpers.lastSIdx].pity += 1
            
        }
        pulls.push(newPull)
        
    }
    params.end_id = pulls[pulls.length - 1].id
    console.log(`Fetched ${pulls.length} pulls from banner ${params.real_gacha_type}`)
    await new Promise(e => setTimeout(e, 300));
    return await fetchBanner(params, pulls, stats, helpers)
}

async function fetchPulls(authkey: string) {
    params.authkey = authkey
    let pulls: Pull[] = []
    let stats: Stat[] = []
    for (let gachatype of gachatypeslist) {
        console.log(`Fetching from banner ${gachatype}`)
        params.real_gacha_type = Number(gachatype)
        const gachatypePulls = await fetchBanner(params)
        if (!gachatypePulls) {
            console.log("error occured while fetching pulls")
            return
        }
        console.log(`Fetched ${gachatypePulls[0].length} pulls from banner ${gachatype}`)
        pulls.push(...gachatypePulls[0])
        stats.push(gachatypePulls[1])
    }
    console.log(pulls)
    await db.pulls.bulkPut(pulls)
    await db.stats.bulkPut(stats)
    return pulls
}


function PullsList({ pulls }: { pulls: Pull[] }) {
    return <div className="flex flex-col w-full gap-[4px] text-black">
        {pulls.map(pull => <PullComponent key={pull.id} pull={pull}/>)}
    </div>
}
function PullListHeading({ children }: { children: ReactNode }) {
    return <div className="w-full grid place-items-center text-[48px] font-black text-slate-800 drop-shadow-xl">{children}</div>
}
function NoDataPlaceholder() {
    return <div className="py-[8px] w-full grid place-items-center">No data</div>
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
                <Tab name="main-nav" kind={GameKinds.ZZZ}>
                    Zenless Zone Zero
                </Tab>
            </div>
        </div>
        <div className="text-black w-full rounded-[20px] bg-white outline outline-[1px] outline-slate-500 p-[32px] shadow-xl flex flex-col gap-[20px]">
            <h1 className="text-[20px] text-slate-800 px-[24px] font-black">Fetch pulls</h1>
            <div className="flex gap-[16px] items-stretch">
                <Input kind={GameKinds.GENSHIN} value={input} onChange={e => setInput(e.target.value)} placeholder="Enter your authkey" name="authkey"/>
                <Button kind={GameKinds.GENSHIN} onMouseDown={buttonMouseDownAnimation} onMouseUp={buttonMouseUpAnimation} ref={buttonRef} onClick={() => setTrigger(!trigger)}>Fetch</Button>
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