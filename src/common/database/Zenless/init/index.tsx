import Dexie, { EntityTable } from "dexie";
import GameAccountEntity from "../../entities/GameAccount";
import STORES from "../../stores";
import ZenlessItemType from "@/common/types/Zenless/ItemType";
import ZenlessGachaType from "@/common/types/Zenless/GachaType";
import ZenlessRankType from "@/common/types/Zenless/RankType";
import PullEntity from "../../entities/Pull";
import StatEntity from "../../entities/Stat";
export const ZenlessDB = new Dexie("hwh-zenless-db") as Dexie & {
    pulls: EntityTable<PullEntity<ZenlessItemType, ZenlessGachaType, ZenlessRankType>, 'id'>,
    gameaccs: EntityTable<GameAccountEntity, 'uid'>,
    stats: EntityTable<StatEntity<ZenlessGachaType>>
}
ZenlessDB.version(1).stores(STORES)