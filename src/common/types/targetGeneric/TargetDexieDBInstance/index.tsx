import Dexie, { EntityTable } from "dexie";
import PullEntity from "@/common/database/entities/Pull";
import StatEntity from "@/common/database/entities/Stat";
import GameAccountEntity from "@/common/database/entities/GameAccount";
import ItemTypeUnion from "../../union/ItemTypeUnion";
import GachaTypeUnion from "../../union/GachaTypeUnion";
import RankTypeUnion from "../../union/RankTypeUnion";
type TargetDexieDBInstance<ItemType extends ItemTypeUnion, GachaType extends GachaTypeUnion, RankType extends RankTypeUnion> = Dexie & {
    pulls: EntityTable<PullEntity<ItemType, GachaType, RankType>, "id">
    gameaccs: EntityTable<GameAccountEntity, "uid">;
    stats: EntityTable<StatEntity<GachaType>>
}
export default TargetDexieDBInstance