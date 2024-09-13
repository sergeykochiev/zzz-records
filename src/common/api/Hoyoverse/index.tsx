import CachedUrlParams from "@/common/types/CachedUrlParams"
import HoyoParams from "./Params"
import PullEntity from "@/common/database/entities/Pull"
import StatEntity from "@/common/database/entities/Stat"
import HoyoPull from "@/common/types/dto/Hoyoverse/HoyoPull"
import GenshinGachaType from "@/common/types/dto/Genshin/GachaType"
import ZenlessGachaType from "@/common/types/dto/Zenless/GachaType"
import StarrailGachaType from "@/common/types/dto/Starrail/GachaType"
import GenshinRankType from "@/common/types/dto/Genshin/RankType"
import StarrailRankType from "@/common/types/dto/Starrail/RankType"
import ZenlessRankType from "@/common/types/dto/Zenless/RankType"
import GachaLogApiRouteUrls from "@/common/enum/GachaLogRouteApiUrls"
class HoyoApiClass<GachaType extends GenshinGachaType | StarrailGachaType | ZenlessGachaType> {
    private params: Partial<HoyoParams> = {
        authkey_ver: 1,
        lang: "en_US",
        size: 20,
    }
    private helpers = {
        foundEpicPity: false,
        foundLegendaryPity: false,
        lastEpicIdx: -1,
        lastLegendaryIdx: -1,
    }
    private stats: (Record<GachaType, StatEntity> | Record<PropertyKey, never>) = {}
    private pulls: (Record<GachaType, PullEntity[]> | Record<PropertyKey, never>) = {}
    constructor(
        authkey: string,
        lang: string,
        gameBiz: string,
        private gachaTypeField: "real_gacha_type" | "gacha_type",
        private rankTypes: Record<keyof typeof GenshinRankType, GenshinRankType | StarrailRankType | ZenlessRankType>,
        private gachaTypes: Record<keyof typeof GenshinGachaType, GachaType> | Record<keyof typeof ZenlessGachaType, GachaType> | Record<keyof typeof StarrailGachaType, GachaType>,
        private url: GachaLogApiRouteUrls
    ) {
        this.params = {
            authkey: authkey,
            lang: lang,
            game_biz: gameBiz,
        }
    }
    getParams() {
        return this.params
    }
    getStringifiedParams() {
        const stringified: Partial<CachedUrlParams> = {}
        Object.keys(this.params).forEach(k => {
            stringified[k as keyof Partial<CachedUrlParams>] = '' + this.params[k as keyof Partial<HoyoParams>]
        })
        return stringified
    }
    getUrl() {
        return `${this.url}?${new URLSearchParams(this.getStringifiedParams())}`
    }
    handleIncomingPull(pull: HoyoPull) {
        const currentGachaType = this.params[this.gachaTypeField]! as GachaType
        const currentStat = this.stats[currentGachaType]
        const currentPulls = this.pulls[currentGachaType]
        const newPull: PullEntity = {
            uid: pull.uid,
            itemId: pull.item_id,
            gachaType: currentGachaType,
            time: pull.time,
            name: pull.name,
            itemType: pull.item_type,
            rankType: pull.rank_type,
            id: pull.id,
            pity: 0
        }
        if (!currentStat.uid) currentStat.uid = pull.uid
        // if (eventgachaTypes.includes(stats.gacha_type)) {}
        currentStat.count += 1
        if (pull.rank_type == this.rankTypes.EPIC) {
            currentStat.countEpic += 1
            if (!this.helpers.foundEpicPity) this.helpers.foundEpicPity = true
            if (!this.helpers.foundLegendaryPity) currentStat.currentLegendaryPity += 1
            if (this.helpers.lastEpicIdx >= 0) {
                currentPulls[this.helpers.lastEpicIdx].pity += 1
                currentStat.avgEpicPity += currentPulls[this.helpers.lastEpicIdx].pity
            }
            if (this.helpers.lastLegendaryIdx >= 0) currentPulls[this.helpers.lastLegendaryIdx].pity += 1
            this.helpers.lastEpicIdx = currentPulls.length
        } else if (pull.rank_type == this.rankTypes.LEGENDARY) {
            currentStat.countLegendary += 1
            if (!this.helpers.foundLegendaryPity) this.helpers.foundLegendaryPity = true
            if (!this.helpers.foundEpicPity) currentStat.currentEpicPity += 1
            if (this.helpers.lastEpicIdx >= 0) currentPulls[this.helpers.lastEpicIdx].pity += 1
            if (this.helpers.lastLegendaryIdx >= 0) {
                currentPulls[this.helpers.lastLegendaryIdx].pity += 1
                currentStat.avgLegendaryPity += currentPulls[this.helpers.lastLegendaryIdx].pity
            }
            this.helpers.lastLegendaryIdx = currentPulls.length
        } else {
            if (!this.helpers.foundEpicPity) currentStat.currentEpicPity += 1
            if (!this.helpers.foundLegendaryPity) currentStat.currentLegendaryPity += 1
            if (this.helpers.lastEpicIdx >= 0) currentPulls[this.helpers.lastEpicIdx].pity += 1
            if (this.helpers.lastLegendaryIdx >= 0) currentPulls[this.helpers.lastLegendaryIdx].pity += 1
        }
        return newPull
    }
    async fetchPulls() {
        for (let gachatype of Object.values(this.gachaTypes)) {
            this.params[this.gachaTypeField] = gachatype
            await this.fetchBannerRecursive()
        }
        // await db.pulls.bulkPut(pulls)
        // await db.stats.bulkPut(stats)
        return [this.pulls, this.stats]
    }
    async fetchBannerRecursive(): Promise<PullEntity[] | void> {
        const currentGachaType = this.params[this.gachaTypeField]! as GachaType
        const currentStat = this.stats[currentGachaType]
        const currentPulls = this.pulls[currentGachaType]
        const url = this.getUrl()
        const res = await fetch(url)
        if (!res.ok) {
            console.log(`fetch error ${res.status}: ${res.statusText}`)
            return
        }
        const json =await res.json()
        if (json.retcode != 0) {
            console.log(`retcode error ${json.retcode}: ${json.message}`)
            return
        }
        if (json.data.list.length == 0) {
            this.params.end_id = 0
            if (this.helpers.lastEpicIdx >= 0) this.stats[currentGachaType].avgEpicPity += currentPulls[this.helpers.lastEpicIdx].pity
            if (this.helpers.lastLegendaryIdx >= 0) currentStat.avgLegendaryPity += currentPulls[this.helpers.lastLegendaryIdx].pity
            currentStat.avgEpicPity /= currentStat.countEpic
            currentStat.avgLegendaryPity /= currentStat.countLegendary
            return
        }
        for (const pull of json.data.list) {
            this.handleIncomingPull(pull)
        }
        this.params.end_id = Number(currentPulls[currentPulls.length - 1].id)
        console.log(`Fetched ${currentPulls.length} pulls from banner ${this.gachaTypeField}`)
        await new Promise(e => setTimeout(e, 300));
        await this.fetchBannerRecursive()
    }
}
export default HoyoApiClass