import Dexie, { EntityTable } from "dexie";
import GameAccountEntity from "../../entities/GameAccount";
import STORES from "../../stores";
import PullEntity from "../../entities/Pull";
import GenshinItemType from "@/common/types/Genshin/ItemType";
import GenshinGachaType from "@/common/types/Genshin/GachaType";
import GenshinRankType from "@/common/types/Genshin/RankType";
import StatEntity from "../../entities/Stat";
export const GenshinDB = new Dexie("hwh-genshin-db") as Dexie & {
    pulls: EntityTable<PullEntity<GenshinItemType, GenshinGachaType, GenshinRankType>, 'id'>,
    gameaccs: EntityTable<GameAccountEntity, 'uid'>,
    stats: EntityTable<StatEntity<GenshinGachaType>>
}
GenshinDB.version(1).stores(STORES)