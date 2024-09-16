import Dexie, { EntityTable } from "dexie";
import GameAccountEntity from "../../entities/GameAccount";
import GenshinPullEntity from "../Pull";
import STORES from "../../stores";
import StarrailStatEntity from "../../Starrail/Stat";
import GenshinStatEntity from "../Stat";
export const GenshinDB = new Dexie("hwh-genshin-db") as Dexie & {
    pulls: EntityTable<GenshinPullEntity, 'id'>,
    gameaccs: EntityTable<GameAccountEntity, 'id'>,
    stats: EntityTable<GenshinStatEntity>
}
GenshinDB.version(1).stores(STORES)