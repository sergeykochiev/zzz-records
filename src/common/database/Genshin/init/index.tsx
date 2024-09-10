import Dexie, { EntityTable } from "dexie";
import GameAccountEntity from "../../entities/GameAccount";
import StatEntity from "../../entities/Stat";
import GenshinPullEntity from "../Pull";
import STORES from "../../stores";
export const GenshinDB = new Dexie("hwh-genshin-db") as Dexie & {
    pulls: EntityTable<GenshinPullEntity, 'id'>,
    gameaccs: EntityTable<GameAccountEntity, 'id'>,
    stats: EntityTable<StatEntity>
}
GenshinDB.version(1).stores(STORES)