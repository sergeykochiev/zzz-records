import Dexie, { EntityTable } from "dexie";
import PullEntity from "../entities/Pull";
import GameAccountEntity from "../entities/GameAccount";
import StatEntity from "../entities/Stat";
export const db = new Dexie("hwh-db") as Dexie & {
    pulls: EntityTable<PullEntity, 'id'>,
    gameaccs: EntityTable<GameAccountEntity, 'id'>,
    stats: EntityTable<StatEntity>
}
db.version(1).stores({
    pulls: "id, [uid+gacha_type], item_id, time, name, item_type, rank_type",
    gameaccs: "++id, uid",
    stats: "[uid+gacha_type]"
})
