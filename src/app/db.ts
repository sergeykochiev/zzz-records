import Dexie, { EntityTable } from "dexie";

export interface Pull {
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
export interface Stat {
    uid: string
    gacha_type: 1 | 2 | 3 | 5
    currentAPity: number
    currentSPity: number
    nextAIsUp: boolean
    nextSIsUp: boolean
    countA: number
    countS: number
    avgAPity: number
    avgSPity: number
    count: number
}
export interface GameAccound {
    id?: number
    uid: string
}
export const db = new Dexie("zzz-db") as Dexie & {
    pulls: EntityTable<Pull, 'id'>,
    gameaccs: EntityTable<GameAccound, 'id'>,
    stats: EntityTable<Stat>
}
db.version(1).stores({
    pulls: "id, [uid+gacha_type], item_id, time, name, item_type, rank_type",
    gameaccs: "++id, uid",
    stats: "[uid+gacha_type]"
})
