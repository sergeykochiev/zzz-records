"use client"

import GameKinds from "@/components/common/types/GameKinds"
import Input from "@/components/Input"
import { ReactNode, useEffect, useRef, useState } from "react"

type Pull = {
    uid: string,
    gacha_id: string,
    gacha_type: string,
    item_id: string,
    count: string,
    time: string
    name: string,
    lang: string,
    item_type: string,
    rank_type: string,
    id: string
    region: string,
    region_time_zone: string
}
type Pulls = Record<gachatypes, Pull[]> 
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

async function fetchBanner(params: Record<string, any>, pulls: Pull[] = []): Promise<Pull[] | void> {
    const url = getUrl(params)
    console.log(url)
    const res = await fetch(url)
    if (!res.ok) {
        console.log(`fetch error ${res.status}: ${res.statusText}`)
        return
    }
    const json = await res.json()
    console.log(json)
    if (json.retcode != 0) {
        console.log(`retcode error ${json.retcode}: ${json.message}`)
        return
    }
    if (json.data.list.length == 0) {
        params.end_id = 0
        return pulls
    }
    const newPulls = pulls.concat(json.data.list)
    console.log(newPulls)
    params.end_id = newPulls[newPulls.length - 1].id
    console.log(params.end_id)
    await new Promise(e => setTimeout(e, 300));
    return await fetchBanner(params, newPulls)
}

async function fetchPulls(authkey: string) {
    params.authkey = authkey
    const pulls: Pulls = {
        1: [],
        2: [],
        3: [],
        5: []
    }
    for (let gachatype of gachatypeslist) {
        console.log(`Fetching from banner ${gachatype}`)
        params.real_gacha_type = Number(gachatype)
        const gachatypePulls = await fetchBanner(params)
        if (!gachatypePulls) {
            console.log("error occured while fetching pulls")
            return
        }
        console.log(`Fetched ${gachatypePulls.length} pulls from banner ${gachatype}`)
        pulls[gachatype] = gachatypePulls
    }
    return pulls
}

function PullComponent({ pull }: { pull: Pull }) {
    return <div className={`hover:scale-[1.01] transition-all ${pull.rank_type == "2" && "bg-slate-200"} ${pull.rank_type == "3" && "bg-purple-200"} ${pull.rank_type == "4" && "bg-orange-200"} shadow grid grid-cols-[2fr,1fr,1fr] whitespace-nowrap w-full py-[8px] px-[16px] rounded-[20px] place-items-center gap-[8px]`}>
        <div className="place-self-start font-bold">{pull.name}</div>
        <div>{pull.item_type}</div>
        <div className="place-self-end">{pull.item_id}</div>
    </div>
}
function PullsList({ pulls }: { pulls: Pull[] }) {
    return <div className="flex flex-col w-full gap-[8px] text-black">
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
    const [pulls, setPulls] = useState<Pulls>()
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const button = buttonRef.current
    useEffect(() => {
        if (isInitialLoad) {
            setIsInitialLoad(false)
            return
        }
        async function fetchData() {
            const pulls = await fetchPulls(input)
            setPulls(pulls)
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
                <Input kind={GameKinds.GENSHIN} value={input} onChange={e => setInput(e.target.value)} placeholder="Enter your authkey" name="authkey"/>
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
                {pulls && pulls[1].length ? <PullsList pulls={pulls[1]}/> : <NoDataPlaceholder/>}
                {pulls && pulls[2].length ? <PullsList pulls={pulls[2]}/> : <NoDataPlaceholder/>}
                {pulls && pulls[3].length ? <PullsList pulls={pulls[3]}/> : <NoDataPlaceholder/>}
                {pulls && pulls[5].length ? <PullsList pulls={pulls[5]}/> : <NoDataPlaceholder/>}
            </div>
        </div>
    </main>
}