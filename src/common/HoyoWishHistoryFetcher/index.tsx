import CachedUrlParams from "@/common/types/CachedUrlParams"
import PullEntity from "@/common/database/entities/Pull"
import StatEntity from "@/common/database/entities/Stat"
import HoyoPull from "@/common/api/Hoyoverse/model/WishHistory/response/HoyoPull"
import GenshinGachaType from "@/common/types/Genshin/GachaType"
import ZenlessGachaType from "@/common/types/Zenless/GachaType"
import StarrailGachaType from "@/common/types/Starrail/GachaType"
import GachaLogApiRouteUrls from "@/common/api/routes/endpoints/GachaLog"
import HoyoApiError from "@/common/error/HoyoApiError"
import GachaTypeUnion from "@/common/types/GachaTypeUnion"
import RankTypeUnion from "@/common/types/RankTypeUnion"
import TargetRankTypesEnum from "@/common/types/TargetRankTypesEnum"
import TargetGachaTypesEnum from "@/common/types/TargetGachaTypesEnum"
import sleep from "@/common/functions/sleep"
import ItemTypeUnion from "@/common/types/ItemTypeUnion"
import HoyoApi from "../api/Hoyoverse/HoyoApi"
import HoyoWishHistoryParams from "../api/Hoyoverse/model/WishHistory/params"
type Helpers = {
    foundEpicPity: boolean,
    foundLegendaryPity: boolean,
    lastEpicIdx: number,
    lastLegendaryIdx: number,
}
class HoyoWishHistoryFetcher<ItemType extends ItemTypeUnion, GachaType extends GachaTypeUnion, RankType extends RankTypeUnion> {
    protected params: Partial<HoyoWishHistoryParams<GachaType>> = {
        authkey_ver: 1,
        sign_type: 2,
        lang: "en-us",
        size: 20,
        end_id: ""
    }
    protected defaultApiDelay = 300
    protected stats: Record<GachaType, StatEntity<GachaType>> = {} as Record<GachaType, StatEntity<GachaType>>
    protected pulls: Record<GachaType, PullEntity<ItemType, GachaType, RankType>[]> = {} as Record<GachaType, PullEntity<ItemType, GachaType, RankType>[]>
    constructor(
        protected loggerFunction: (message: string) => void,
        authkey: string,
        lang: string,
        gameBiz: string,
        protected gachaTypeField: "real_gacha_type" | "gacha_type",
        protected rankTypes: TargetRankTypesEnum<RankType>,
        protected gachaTypes: TargetGachaTypesEnum<GachaType>,
        protected api: HoyoApi<ItemType, GachaType, RankType>
    ) {
        this.params = {
            ...this.params,
            authkey: authkey,
            lang: lang,
            game_biz: gameBiz,
        }
    }
    protected getParams() {
        return this.params
    }
    protected async getSampleDataProbe() {
        this.params.size = 1
        const responses = []
        for (let key of Object.keys(this.gachaTypes)) {
            if (!+key) continue
            this.params[this.gachaTypeField] = Number(key) as GachaType
            const res = await this.api.getWishHistory(this.getStringifiedParams(this.params))
            if (res.retcode != 0) throw new HoyoApiError(res.retcode, res.message)
            responses.push(res.data.list)
            await sleep(this.defaultApiDelay)
        }
        return responses
    }
    async getUid(): Promise<string | undefined> {
        const sampleResponses = await this.getSampleDataProbe()
        for (let i = 0; i < sampleResponses.length; i++) {
            const pullsList = sampleResponses[i]
            if (pullsList.length > 0) return pullsList[0].uid
        }
        return
    }
    protected getStringifiedParams<R extends Record<PropertyKey, number | string>>(params: R): Record<keyof R, string> {
        const stringified: Record<keyof R, string> = {} as Record<keyof R, string>
        Object.keys(params).forEach(k => {
            stringified[k as keyof R] = '' + params[k as keyof R]
        })
        return stringified
    }
    protected async checkAuthkey() {
        this.params.size = 1
        const res = await this.api.getWishHistory(this.getStringifiedParams(this.params))
        if (res.retcode == 0) return true
        return false
    }
    protected handleIncomingPull(pull: HoyoPull<ItemType, GachaType, RankType>, helpers: Helpers) {
        const currentGachaType = this.params[this.gachaTypeField] as GachaType
        const newPull: PullEntity<ItemType, GachaType, RankType> = {
            uid: pull.uid,
            itemId: pull.item_id,
            gachaType: currentGachaType,
            time: pull.time,
            name: pull.name,
            itemType: pull.item_type as ItemType,
            rankType: +pull.rank_type as RankType,
            id: pull.id,
            pity: 0
        }
        this.stats[currentGachaType].uid = pull.uid
        this.stats[currentGachaType].count += 1
        if (newPull.rankType == this.rankTypes.EPIC) {
            this.stats[currentGachaType].countEpic += 1
            if (!helpers.foundEpicPity) helpers.foundEpicPity = true
            if (!helpers.foundLegendaryPity) this.stats[currentGachaType].currentLegendaryPity += 1
            if (helpers.lastEpicIdx >= 0) {
                this.pulls[currentGachaType][helpers.lastEpicIdx].pity += 1
                this.stats[currentGachaType].avgEpicPity += this.pulls[currentGachaType][helpers.lastEpicIdx].pity
            }
            if (helpers.lastLegendaryIdx >= 0) this.pulls[currentGachaType][helpers.lastLegendaryIdx].pity += 1
            helpers.lastEpicIdx = this.pulls[currentGachaType].length
        } else if (newPull.rankType == this.rankTypes.LEGENDARY) {
            this.stats[currentGachaType].countLegendary += 1
            if (!helpers.foundLegendaryPity) helpers.foundLegendaryPity = true
            if (!helpers.foundEpicPity) this.stats[currentGachaType].currentEpicPity += 1
            if (helpers.lastEpicIdx >= 0) this.pulls[currentGachaType][helpers.lastEpicIdx].pity += 1
            if (helpers.lastLegendaryIdx >= 0) {
                this.pulls[currentGachaType][helpers.lastLegendaryIdx].pity += 1
                this.stats[currentGachaType].avgLegendaryPity += this.pulls[currentGachaType][helpers.lastLegendaryIdx].pity
            }
            helpers.lastLegendaryIdx = this.pulls[currentGachaType].length
        } else {
            if (!helpers.foundEpicPity) this.stats[currentGachaType].currentEpicPity += 1
            if (!helpers.foundLegendaryPity) this.stats[currentGachaType].currentLegendaryPity += 1
            if (helpers.lastEpicIdx >= 0) this.pulls[currentGachaType][helpers.lastEpicIdx].pity += 1
            if (helpers.lastLegendaryIdx >= 0) this.pulls[currentGachaType][helpers.lastLegendaryIdx].pity += 1
        }
        this.pulls[currentGachaType].push(newPull)
    }
    async fetchPullsAndCalculateStats(endIds: Record<GachaType, string>): Promise<[Record<GachaType, PullEntity<ItemType, GachaType, RankType>[]>, Record<GachaType, StatEntity<GachaType>>]> {
        await this.checkAuthkey()
        this.params.size = 20
        for (let key of Object.keys(this.gachaTypes)) {
            if (!+key) continue
            this.params[this.gachaTypeField] = +key as GachaType
            this.params.end_id = endIds[+key as GachaType]
            this.stats[+key as GachaType] = {
                uid: "",
                gachaType: +key,
                currentEpicPity: 0,
                currentLegendaryPity: 0,
                nextEpicIsUp: false,
                nextLegendaryIsUp: false,
                countEpic: 0,
                countLegendary: 0,
                avgEpicPity: 0,
                avgLegendaryPity: 0,
                count: 0
            } as StatEntity<GachaType>
            this.pulls[+key as GachaType] = [] as PullEntity<ItemType, GachaType, RankType>[]
            await this.fetchBannerRecursive()
            this.loggerFunction(`Finished fetching ${this.gachaTypes[+key as keyof (typeof GenshinGachaType | StarrailGachaType | ZenlessGachaType)]} banner`)
        }
        return [this.pulls, this.stats]
    }
    protected async fetchBannerRecursive(helpers: Helpers = {
        foundEpicPity: false,
        foundLegendaryPity: false,
        lastEpicIdx: -1,
        lastLegendaryIdx: -1,
    }): Promise<PullEntity<ItemType, GachaType, RankType>[] | void> {
        const currentGachaType = this.params[this.gachaTypeField] as GachaType
        const res = await this.api.getWishHistory(this.getStringifiedParams(this.params))
        if (res.retcode != 0) {
            throw new HoyoApiError(res.retcode, res.message)
        }
        if (res.data.list.length == 0) {
            this.params.end_id = ""
            if (helpers.lastEpicIdx >= 0) this.stats[currentGachaType].avgEpicPity += this.pulls[currentGachaType][helpers.lastEpicIdx].pity
            if (helpers.lastLegendaryIdx >= 0) this.stats[currentGachaType].avgLegendaryPity += this.pulls[currentGachaType][helpers.lastLegendaryIdx].pity
            this.stats[currentGachaType].avgEpicPity /= this.stats[currentGachaType].countEpic
            this.stats[currentGachaType].avgLegendaryPity /= this.stats[currentGachaType].countLegendary
            return
        }
        for (const pull of res.data.list) {
            this.handleIncomingPull(pull, helpers)
        }
        this.params.end_id = this.pulls[currentGachaType][this.pulls[currentGachaType].length - 1].id
        this.loggerFunction(`Fetched ${this.pulls[currentGachaType].length} pulls from ${this.gachaTypes[currentGachaType as keyof (typeof GenshinGachaType | StarrailGachaType | ZenlessGachaType)]} banner`)
        await sleep(this.defaultApiDelay)
        await this.fetchBannerRecursive(helpers)
    }
}
export default HoyoWishHistoryFetcher