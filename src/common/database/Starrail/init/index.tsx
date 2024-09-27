import Dexie, { EntityTable } from "dexie";
import GameAccountEntity from "../../entities/GameAccount";
import STORES from "../../stores";
import StarrailGachaType from "@/common/types/game/Starrail/GachaType";
import PullEntity from "../../entities/Pull";
import StatEntity from "../../entities/Stat";
import StarrailItemType from "@/common/types/game/Starrail/ItemType";
import StarrailRankType from "@/common/types/game/Starrail/RankType";
export const StarrailDB = new Dexie("hwh-starrail-db") as Dexie & {
    pulls: EntityTable<PullEntity<StarrailItemType, StarrailGachaType, StarrailRankType>, 'id'>,
    gameaccs: EntityTable<GameAccountEntity, 'uid'>,
    stats: EntityTable<StatEntity<StarrailGachaType>>
}
StarrailDB.version(1).stores(STORES)