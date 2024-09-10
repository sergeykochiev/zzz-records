import Dexie, { EntityTable } from "dexie";
import GameAccountEntity from "../../entities/GameAccount";
import StatEntity from "../../entities/Stat";
import STORES from "../../stores";
import StarrailPullEntity from "../Pull";
export const StarrailDB = new Dexie("hwh-starrail-db") as Dexie & {
    pulls: EntityTable<StarrailPullEntity, 'id'>,
    gameaccs: EntityTable<GameAccountEntity, 'id'>,
    stats: EntityTable<StatEntity>
}
StarrailDB.version(1).stores(STORES)