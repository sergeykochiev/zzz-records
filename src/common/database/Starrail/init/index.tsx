import Dexie, { EntityTable } from "dexie";
import GameAccountEntity from "../../entities/GameAccount";
import STORES from "../../stores";
import StarrailPullEntity from "../Pull";
import StarrailStatEntity from "../Stat";
export const StarrailDB = new Dexie("hwh-starrail-db") as Dexie & {
    pulls: EntityTable<StarrailPullEntity, 'id'>,
    gameaccs: EntityTable<GameAccountEntity, 'id'>,
    stats: EntityTable<StarrailStatEntity>
}
StarrailDB.version(1).stores(STORES)