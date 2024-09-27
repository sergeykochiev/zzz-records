import Dexie, { EntityTable, PromiseExtended } from "dexie";
import PullEntity from "../entities/Pull";
import GachaTypeUnion from "@/common/types/GachaTypeUnion";
import RankTypeUnion from "@/common/types/RankTypeUnion";
import GameAccountEntity from "../entities/GameAccount";
import StatEntity from "../entities/Stat";
import TargetGachaTypesEnum from "@/common/types/targetGeneric/TargetGachaTypesEnum";
import ItemTypeUnion from "@/common/types/ItemTypeUnion";
type GetPullsDto<GachaType extends GachaTypeUnion> = {
    uid: string,
    gachaType: GachaType
}
type GetStatsDto<GachaType extends GachaTypeUnion> = GetPullsDto<GachaType>
class DexieDBHelperClass<ItemType extends ItemTypeUnion, GachaType extends GachaTypeUnion, RankType extends RankTypeUnion> {
    constructor(
        private dbInstance: Dexie & {
            pulls: EntityTable<PullEntity<ItemType, GachaType, RankType>, "id">
            gameaccs: EntityTable<GameAccountEntity, "uid">;
            stats: EntityTable<StatEntity<GachaType>>
        },
        private gachaTypes: TargetGachaTypesEnum<GachaType>
    ) {}
    async getPullsByUidAndGachaType(dto: GetPullsDto<GachaType>): Promise<PullEntity<ItemType, GachaType, RankType>[]> {
        return await this.syncGetPullsByUidAndGachaType(dto)
    }
    syncGetPullsByUidAndGachaType(dto: GetPullsDto<GachaType>): PromiseExtended<PullEntity<ItemType, GachaType, RankType>[]> {
        return this.getPullsCollection(dto).reverse().sortBy("time")
    }
    getPullsCollection(dto: GetPullsDto<GachaType>) {
        return this.dbInstance.pulls.where(["uid", "gachaType"]).equals([dto.uid, dto.gachaType])
    }
    async getStatsByUidAndGachaType(dto: GetStatsDto<GachaType>): Promise<StatEntity<GachaType> | undefined> {
        return await this.syncGetStatsByUidAndGachaType(dto)
    }
    syncGetStatsByUidAndGachaType(dto: GetStatsDto<GachaType>): PromiseExtended<StatEntity<GachaType> | undefined> {
        return this.dbInstance.stats.get({
            uid: dto.uid,
            gachaType: dto.gachaType
        })
    }
    async saveManyPulls(pulls: PullEntity<ItemType, GachaType, RankType>[]) {
        await this.dbInstance.pulls.bulkAdd(pulls)
    }
    async saveStat(stat: StatEntity<GachaType>) {
        await this.dbInstance.stats.add(stat)
    }
    protected async getEndIdByGachaType(dto: GetPullsDto<GachaType>): Promise<string> {
        const lastPullArray = await this.getPullsCollection(dto).reverse().limit(1).toArray()
        if (!lastPullArray.length) return ""
        return String(lastPullArray[0].id)
    }
    async getEndIds(uid: string): Promise<Record<GachaType, string>> {
        const endIds: Record<GachaType, string> = {} as Record<GachaType, string>
        for (let key of Object.keys(this.gachaTypes)) {
            if (!+key) continue
            const endId = await this.getEndIdByGachaType({
                uid: uid,
                gachaType: +key as GachaType
            })
            endIds[+key as GachaType] = endId
        }
        return endIds
    }
    async getAllGameAccounts(): Promise<GameAccountEntity[]> {
        return await this.syncGetAllGameAccounts()
    }
    syncGetAllGameAccounts(): PromiseExtended<GameAccountEntity[]> {
        return this.dbInstance.gameaccs.toArray()
    }
    async saveGameAccount(gameAccount: GameAccountEntity) {
        const existingGameAccount = await this.dbInstance.gameaccs.get({
            uid: gameAccount.uid
        })
        if (existingGameAccount) return
        await this.dbInstance.gameaccs.add(gameAccount)
    }
}
export default DexieDBHelperClass