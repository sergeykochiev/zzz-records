import Dexie, { EntityTable } from "dexie";
import GameAccountEntity from "../../entities/GameAccount";
import StatEntity from "../../entities/Stat";
import STORES from "../../stores";
import ZenlessPullEntity from "../Pull";
export const ZenlessDB = new Dexie("hwh-zenless-db") as Dexie & {
    pulls: EntityTable<ZenlessPullEntity, 'id'>,
    gameaccs: EntityTable<GameAccountEntity, 'id'>,
    stats: EntityTable<StatEntity>
}
ZenlessDB.version(1).stores(STORES)