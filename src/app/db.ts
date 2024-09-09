import Dexie, { EntityTable } from "dexie";

export interface PullEntity {
    uid: string,
    gacha_type: "1" | "2" | "3" | "5"
    item_id: string
    time: string
    name: string
    item_type: "Agents" | "W-Engines" | "Bangboo"
    rank_type: "2" | "3" | "4"
    id: string
    pity: number
}
export interface StatEntity {
    uid: string
    gachaType: number
    currentEpicPity: number
    currentLegendaryPity: number
    nextEpicIsUp: boolean
    nextLegendaryIsUp: boolean
    countEpic: number
    countLegendary: number
    avgEpicPity: number
    avgLegendaryPity: number
    count: number
}
export interface GameAccountEntity {
    id?: number
    uid: string
}
export const db = new Dexie("zzz-db") as Dexie & {
    pulls: EntityTable<PullEntity, 'id'>,
    gameaccs: EntityTable<GameAccountEntity, 'id'>,
    stats: EntityTable<StatEntity>
}
db.version(1).stores({
    pulls: "id, [uid+gacha_type], item_id, time, name, item_type, rank_type",
    gameaccs: "++id, uid",
    stats: "[uid+gacha_type]"
})
