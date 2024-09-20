import Dexie, { EntityTable } from "dexie";
import GameAccountEntity from "../../entities/GameAccount";
import STORES from "../../stores";
import ZenlessPullEntity from "../Pull";
import ZenlessStatEntity from "../Stat";
export const ZenlessDB = new Dexie("hwh-zenless-db") as Dexie & {
    pulls: EntityTable<ZenlessPullEntity, 'id'>,
    gameaccs: EntityTable<GameAccountEntity, 'uid'>,
    stats: EntityTable<ZenlessStatEntity>
}
ZenlessDB.version(1).stores(STORES)