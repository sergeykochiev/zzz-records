import getUrl from "../../functions/getUrl"
import Games from "@/common/types/Games"
import GachaLogApiRouteUrls from "@/common/maps/GachaLogRouteApiUrls"
import StatEntity from "@/common/database/entities/Stat"
import { TargetParams } from "../fetchPulls"
export default async function fetchBannerRecursive(params: TargetParams, pulls: TargetPullEntity[] = [], stats: StatEntity = {
        uid: "",
        gachaType: game == Games.ZENLESS ? params["real_gacha_type"] : params["real_gacha_type"],
        count: 0,
        countEpic: 0,
        countLegendary: 0,
        currentEpicPity: 0,
        currentLegendaryPity: 0,
        nextEpicIsUp: false,
        nextLegendaryIsUp: false,
        avgEpicPity: 0,
        avgLegendaryPity: 0,
    }, helpers = {
        foundEpicPity: false,
        foundLegendaryPity: false,
        lastEpicIdx: -1,
        lastLegendaryIdx: -1,
    }): Promise<[TargetPullEntity<T>[], StatEntity] | void> {
        const url = getUrl(rootUrl, params)
        const res = await fetch(url)
        if (!res.ok) {
            console.log(`fetch error ${res.status}: ${res.statusText}`)
            return
        }
        const json: TargetResponse<typeof game> = await res.json()
        if (json.retcode != 0) {
            console.log(`retcode error ${json.retcode}: ${json.message}`)
            return
        }
        if (json.data.list.length == 0) {
            params.end_id = 0
            if (helpers.lastEpicIdx >= 0) stats.avgEpicPity += pulls[helpers.lastEpicIdx].pity
            if (helpers.lastLegendaryIdx >= 0) stats.avgLegendaryPity += pulls[helpers.lastLegendaryIdx].pity
            stats.avgEpicPity /= stats.countEpic
            stats.avgLegendaryPity /= stats.countLegendary
            return [pulls, stats]
        }
        for (const pull of json.data.list) {
            const newPull: TargetPullEntity<T> = {
                uid: pull.uid,
                gachaType: pull.gacha_type,
                itemId: pull.item_id,
                time: pull.time,
                name: pull.name,
                itemType: pull.item_type,
                rankType: pull.rank_type,
                id: pull.id,
                pity: 0
            }
            if (!stats.uid) stats.uid = pull.uid
            // if (eventgachaTypes.includes(stats.gacha_type)) {}
            stats.count += 1
            if (pull.rank_type == "3") {
                stats.countEpic += 1
                if (!helpers.foundEpicPity) helpers.foundEpicPity = true
                if (!helpers.foundLegendaryPity) stats.currentLegendaryPity += 1
                if (helpers.lastEpicIdx >= 0) {
                    pulls[helpers.lastEpicIdx].pity += 1
                    stats.avgEpicPity += pulls[helpers.lastEpicIdx].pity
                }
                if (helpers.lastLegendaryIdx >= 0) pulls[helpers.lastLegendaryIdx].pity += 1
                helpers.lastEpicIdx = pulls.length
            } else if (pull.rank_type == "4") {
                stats.countLegendary += 1
                if (!helpers.foundLegendaryPity) helpers.foundLegendaryPity = true
                if (!helpers.foundEpicPity) stats.currentEpicPity += 1
                if (helpers.lastEpicIdx >= 0) pulls[helpers.lastEpicIdx].pity += 1
                if (helpers.lastLegendaryIdx >= 0) {
                    pulls[helpers.lastLegendaryIdx].pity += 1
                    stats.avgLegendaryPity += pulls[helpers.lastLegendaryIdx].pity
                }
                helpers.lastLegendaryIdx = pulls.length
            } else {
                if (!helpers.foundEpicPity) stats.currentEpicPity += 1
                if (!helpers.foundLegendaryPity) stats.currentLegendaryPity += 1
                if (helpers.lastEpicIdx >= 0) pulls[helpers.lastEpicIdx].pity += 1
                if (helpers.lastLegendaryIdx >= 0) pulls[helpers.lastLegendaryIdx].pity += 1
            }
            pulls.push(newPull)
        }
        params.end_id = Number(pulls[pulls.length - 1].id)
        console.log(`Fetched ${pulls.length} pulls from banner ${params.real_gacha_type}`)
        await new Promise(e => setTimeout(e, 300));
        return await fetchBannerRecursive(params, pulls, stats, helpers)
    }
}
