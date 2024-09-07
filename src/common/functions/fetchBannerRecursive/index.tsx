import HoyoParams from "@/common/dto/Hoyoverse/HoyoParams"
import getUrl from "../getUrl"
import HoyoResponse from "@/common/dto/Hoyoverse/HoyoResponse"
import { PullEntity, StatEntity } from "@/app/db"
export default async function fetchBannerRecursive(rootUrl: string, params: HoyoParams, pulls: PullEntity[] = [], stats: StatEntity = {
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
}): Promise<[PullEntity[], StatEntity] | void> {
    const url = getUrl(rootUrl, params)
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
        const newPull: PullEntity = {
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
    params.end_id = Number(pulls[pulls.length - 1].id)
    console.log(`Fetched ${pulls.length} pulls from banner ${params.real_gacha_type}`)
    await new Promise(e => setTimeout(e, 300));
    return await fetchBannerRecursive(rootUrl, params, pulls, stats, helpers)
}