import getUrl from "../../functions/getUrl"
import Games from "@/common/types/Games"
import GachaLogApiRouteUrls from "@/common/types/GachaLogRouteApiUrls"
import StatEntity from "@/common/database/entities/Stat"
import { TargetParams } from "../fetchPulls"
import ZenlessParamsClass, { ZenlessParams } from "@/common/api/Zenless/Params"
import ZenlessStatEntity from "@/common/database/Zenless/Stat"
import GenshinStatEntity from "@/common/database/Genshin/Stat"
import StarrailStatEntity from "@/common/database/Starrail/Stat"
import OneOf from "@/common/types/OneOf"
import ZenlessPullEntity from "@/common/database/Zenless/Pull"
import GenshinPullEntity from "@/common/database/Genshin/Pull"
import StarrailPullEntity from "@/common/database/Starrail/Pull"
import AllOf from "@/common/types/AllOf"
import ZenlessResponse from "@/common/types/dto/Zenless/Response"
import { GenshinParams } from "@/common/api/Genshin/Params"
import GenshinResponse from "@/common/types/dto/Genshin/Response"
import StarrailResponse from "@/common/types/dto/Starrail/Response"
import ZenlessPull from "@/common/types/dto/Zenless/Pull"
import GenshinPull from "@/common/types/dto/Genshin/Pull"
import StarrailPull from "@/common/types/dto/Starrail/Pull"
import GenshinApiClass from "@/common/api/Genshin"
import StarrailApiClass from "@/common/api/Starrail"
import ZenlessApiClass from "@/common/api/Zenless"
export default async function fetchBannerRecursive<Api extends OneOf<GenshinApiClass, StarrailApiClass, ZenlessApiClass>, PullEntity extends OneOf<ZenlessPullEntity, GenshinPullEntity, StarrailPullEntity>, StatEntity extends AllOf<ZenlessStatEntity, GenshinStatEntity, StarrailStatEntity>>(api: Api, pulls: PullEntity[] = [], stats: StatEntity = {
        uid: "",
        gachaType: api instanceof ZenlessApiClass ? api.getParams()["real_gacha_type"] : api.getParams()["gacha_type"] as Api extends ZenlessApiClass ? "real_gacha_type" : "gacha_type",
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
    }): Promise<[PullEntity[], StatEntity] | void> {
        const url = getUrl(rootUrl, params)
        const res = await fetch(url)
        if (!res.ok) {
            console.log(`fetch error ${res.status}: ${res.statusText}`)
            return
        }
        const json: Params extends ZenlessParams ? ZenlessResponse : Params extends GenshinParams ? GenshinResponse : StarrailResponse = await res.json()
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
            const newPull: PullEntity = {
                uid: pull.uid,
                gachaType: params instanceof ZenlessParamsClass ? (pull as ZenlessPull).real_gacha_type : (pull as StarrailPull | GenshinPull).gacha_type,
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
