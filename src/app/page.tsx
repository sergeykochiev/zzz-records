"use client"

import { ReactNode, useEffect, useRef, useState } from "react"
import { db, Pull, Stat } from "./db"
import { useLiveQuery } from "dexie-react-hooks"

interface HoyoPull {
    uid: string,
    gacha_id: string
    gacha_type: "1" | "2" | "3" | "5"
    item_id: string
    count: 1
    time: string
    name: string
    lang: string
    item_type: "Agents" | "W-Engines" | "Bangboo"
    rank_type: "2" | "3" | "4"
    id: string
}
interface HoyoResponse {
    message: string,
    retcode: number,
    data: {
        page: number,
        size: number,
        list: HoyoPull[],
        region: string,
        region_time_zone: number
    }
}
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

function PullComponent({ pull }: { pull: Pull }) {
    const [opened, setOpened] = useState<boolean>(false)
    return <div className={`select-none w-full flex flex-col ${opened && "bg-slate-400 shadow"} rounded-[22px] p-[2px]`}>
        <div onClick={() => setOpened(!opened)} className={`cursor-pointer transition-all ${pull.rank_type == "2" && "bg-slate-200"} ${pull.rank_type == "3" && "bg-purple-200"} ${pull.rank_type == "4" && "bg-orange-200"} grid grid-cols-[2fr,1fr,1fr] whitespace-nowrap py-[8px] px-[16px] rounded-[20px] place-items-center gap-[8px]`}>
            <div className="place-self-start font-bold">{pull.name}</div>
            <div>{pull.item_type}</div>
            <div className="place-self-end">{pull.time}</div>
        </div>
        {opened && <div className="grid p-[8px] text-white px-[16px] grid-cols-2 gap-[8px] items-start">
            item_id
            <div>{pull.item_id}</div>
            gacha_type
            <div>{pull.gacha_type}</div>
            id
            <div>{pull.id}</div>
            pity
            <div>{pull.pity}</div>
            rank_type
            <div>{pull.rank_type}</div>
            uid
            <div>{pull.uid}</div>
        </div>}
    </div>
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
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const button = buttonRef.current
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
    function buttonMouseDownAnimation() {
        button?.animate([
                {
                    transform: "scale(1)"
                },
                {
                    transform: "scale(0.95)"
                }
            ],
            {
                duration: 100
            }
        )
    }
    function buttonMouseUpAnimation() {
        button?.animate([
                {
                    transform: "scale(0.95)"
                },
                {
                    transform: "scale(1)"
                }
            ],
            {
                duration: 100
            }
        )
    }
    return <main className="px-[128px] pb-[128px] flex flex-col gap-[64px] items-center bg-gray-100 min-h-screen">
        <div className="py-[20px] w-full grid place-items-center text-slate-700 text-[24px] font-black uppercase">ZZZ Records</div>
        <div className="text-black w-full rounded-[20px] bg-white outline outline-[1px] outline-slate-500 p-[32px] shadow-xl flex flex-col gap-[20px]">
            <h1 className="text-[20px] text-slate-800 px-[24px] font-black">Fetch pulls</h1>
            <div className="flex gap-[16px] items-stretch">
                <input value={input} onChange={e => setInput(e.target.value)} placeholder="Enter your authkey" className="w-full font-medium shadow-sm min-w-0 focus:bg-[#ffd129] focus:placeholder:font-bold focus:placeholder:text-black focus:text-black focus:font-bold rounded-full py-[8px] focus:outline-slate-700 focus:border-white outline outline-[3px] outline-transparent border-transparent transition-all border-[2px] border-solid px-[24px] bg-slate-700 text-white placeholder:text-gray-300" name="authkey"/>
                <button onMouseDown={buttonMouseDownAnimation} onMouseUp={buttonMouseUpAnimation} ref={buttonRef} onClick={() => setTrigger(!trigger)} className="px-[24px] py-[8px] hover:outline-slate-700 hover:border-white active:scale-[0.95] outline outline-[3px] outline-transparent border-transparent border-[2px] border-solid min-w-[200px] hover:bg-[#ffd129] hover:font-black hover:text-black text-[14px] shadow-sm text-white font-medium transition-all bg-slate-700 rounded-full">Fetch</button>
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